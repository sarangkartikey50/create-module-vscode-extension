// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const {
	createModule,
	createFunctionalComponent,
	createComponentIndexJs,
	createComponentIndexScss,
	createPageIndexJs,
	createPageIndexScss
} = require('./create-module');
const { QUICK_PICK } = require('./constants');

shell.config.execPath = String(shell.which('node'));
// const configPath = path.resolve(__dirname, 'create-module-config.json');

function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
	var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	var bufView = new Uint8Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return bufView;
}

const createConfigurations = (configPath, config) => {
	fs.writeFile(configPath, JSON.stringify(config, null, 2), function(err) {
		if (err) {
			vscode.window.showErrorMessage(
				`There was some error in creating config.json. ${err.message}`
			);
			return;
		}
		vscode.window.showInformationMessage(
			'Create module configurations added successfully.'
		);
	});
};

const provideConfigurations = (configPath, callback) => {
	fs.readFile(configPath, 'utf8', (err, data) => {
		// @ts-ignore
		if (err) {
			vscode.window.showErrorMessage(
				`Please add configurations. ${err.message}`
			);
			return;
		}
		data = JSON.parse(data);
		const { modulePath, rootReducersPath, rootSagaPath, workspace } = data;
		if (!modulePath || !rootReducersPath || !rootSagaPath || !workspace) {
			vscode.window.showErrorMessage(
				`Please add configurations. ${err.message}`
			);
			return;
		}
		callback(data);
	});
};

const readDirectory = (context, moduleName, callback) => {
	provideConfigurations(
		context.globalState.get('configPath'),
		({ modulePath }) => {
			fs.readdir(
				context.globalState.get('workspace') + modulePath,
				(err, files) => {
					if (err) {
						vscode.window.showErrorMessage(`Couldn't read modules directory`);
						return;
					}
					const isModuleNameFound = files.find(dir => dir === moduleName);
					if (!isModuleNameFound) {
						vscode.window.showErrorMessage(
							`Please enter module which already exists`
						);
						return;
					}
					callback(
						context.globalState.get('workspace') + modulePath + moduleName
					);
				}
			);
		}
	);
};

const inputBox = async placeHolder => {
	const input = await vscode.window.showInputBox({ placeHolder });
	if (input && input.trim()) {
		return input;
	}
	vscode.window.showErrorMessage('Invalid input');
	return '';
};

const handleSelection = async (context, { id, label }) => {
	switch (id) {
		case QUICK_PICK.CONFIGURE: {
			shell.exec(`mkdir .vscode`, {
				cwd: context.globalState.get('workspace')
			});
			const modulePath = await inputBox('Enter path to modules directory');
			const rootSagaPath = await inputBox('Enter path to root saga');
			const rootReducersPath = await inputBox('Enter path to root reducer');
			const routePathsPath = await inputBox('Enter path to routePaths.js');
			const routesPath = await inputBox('Enter path to Routes.js');
			createConfigurations(context.globalState.get('configPath'), {
				modulePath,
				rootSagaPath,
				rootReducersPath,
				routePaths: routePathsPath,
				routes: routesPath,
				workspace: context.globalState.get('workspace')
			});
			break;
		}
		case QUICK_PICK.CREATE_COMPONENT: {
			const moduleName = await inputBox('Enter name of existing module');
			readDirectory(context, moduleName, async modulePath => {
				shell.exec('mkdir Components', { cwd: modulePath });
				modulePath += '/Components/';
				const componentName = await inputBox('Enter name of component');
				try {
					createFunctionalComponent(
						componentName,
						createComponentIndexJs,
						createComponentIndexScss,
						modulePath
					);
					vscode.window.showInformationMessage(
						`${componentName} added successfully.`
					);
				} catch (err) {
					vscode.window.showErrorMessage(
						'Error in creating component ' + err.message
					);
				}
			});
			break;
		}
		case QUICK_PICK.CREATE_MODULE: {
			const moduleName = await inputBox('Enter name of module');
			if (!moduleName && !moduleName.trim()) {
				vscode.window.showErrorMessage('Please enter module name');
				return;
			}
			const pageNames = await inputBox('Enter name of pages (,) separated');
			const componentNames = await inputBox(
				'Enter name of components (,) separated'
			);
			vscode.window.showInformationMessage(`Creating module ${moduleName}...`);
			provideConfigurations(context.globalState.get('configPath'), config => {
				try {
					createModule(
						{
							...config,
							modulePath: config.workspace + config.modulePath
						},
						moduleName,
						(componentNames &&
							componentNames.split(',').map(name => name.trim())) ||
							[],
						(pageNames && pageNames.split(',').map(name => name.trim())) || []
					);
					vscode.window.showInformationMessage(
						`${moduleName} was created successfully.`
					);
				} catch (err) {
					vscode.window.showErrorMessage(
						'Error in creating module. ' + err.message
					);
				}
			});
			break;
		}
		case QUICK_PICK.CREATE_PAGE: {
			const moduleName = await inputBox('Enter name of existing module');
			readDirectory(context, moduleName, async modulePath => {
				shell.exec('mkdir Pages', { cwd: modulePath });
				modulePath += '/Pages/';
				const pageName = await inputBox('Enter name of page');
				try {
					createFunctionalComponent(
						pageName,
						createPageIndexJs,
						createPageIndexScss,
						modulePath
					);
					vscode.window.showInformationMessage(
						`${pageName} added successfully.`
					);
				} catch (err) {
					vscode.window.showErrorMessage(
						'Error in creating component ' + err.message
					);
				}
			});
			break;
		}
		default:
			vscode.window.showErrorMessage(`Invalid selection ${label}.`);
	}
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'extension.createModule',
		async function() {
			// The code you place here will be executed every time your command is executed
			if (
				!context.globalState.get('workspace') ||
				!context.globalState.get('configPath')
			) {
				const workspace = await vscode.window.showQuickPick(
					vscode.workspace.workspaceFolders.map(item => ({
						...item,
						label: item.name
					})),
					{
						placeHolder: vscode.workspace.workspaceFolders
							.map(item => item.name)
							.join(', ')
					}
				);
				context.globalState.update('workspace', workspace.uri.path);
				context.globalState.update(
					'configPath',
					`${workspace.uri.path}/.vscode/crm-config.json`
				);
			}
			const options = [
				{
					label: 'Configure',
					id: QUICK_PICK.CONFIGURE
				},
				{
					label: 'Create a new module',
					id: QUICK_PICK.CREATE_MODULE
				},
				{
					label: 'Create a new Component',
					id: QUICK_PICK.CREATE_COMPONENT
				},
				{
					label: 'Create a new Page',
					id: QUICK_PICK.CREATE_PAGE
				}
			];
			const selection = await vscode.window.showQuickPick(options, {
				placeHolder: options.map(option => option.label).join(', ')
			});
			handleSelection(context, selection);
		}
	);

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
