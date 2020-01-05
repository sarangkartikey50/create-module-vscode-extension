// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const createModule = require('./create-module');
const { QUICK_PICK } = require('./constants');

const configPath = path.resolve(__dirname, 'create-module-config.json');

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

const createConfigurations = config => {
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

const provideConfigurations = callback => {
	fs.readFile(configPath, 'utf8', (err, data) => {
		if (err) {
			vscode.window.showErrorMessage(
				`Please add configurations. ${err.message}`
			);
			return;
		}
		callback(JSON.parse(data));
	});
};

const handleSelection = async (context, { id, label }) => {
	switch (id) {
		case QUICK_PICK.CONFIGURE:
			const modulePath = await vscode.window.showInputBox({
				placeHolder: 'Enter path to modules directory'
			});
			const rootSagaPath = await vscode.window.showInputBox({
				placeHolder: 'Enter path to root saga'
			});
			const rootReducersPath = await vscode.window.showInputBox({
				placeHolder: 'Enter path to root reducer'
			});
			createConfigurations({ modulePath, rootSagaPath, rootReducersPath });
			break;
		case QUICK_PICK.CREATE_COMPONENT:
			vscode.window.showInformationMessage(`you have selected component`);
			break;
		case QUICK_PICK.CREATE_MODULE:
			provideConfigurations(
				({ modulePath, rootReducersPath, rootSagaPath }) => {
					if (!modulePath || !rootReducersPath || !rootSagaPath) {
						vscode.window.showErrorMessage('Please add configurations.');
						return;
					}
					console.log(modulePath, rootReducersPath, rootSagaPath);
				}
			);
			break;
		case QUICK_PICK.CREATE_PAGE:
			vscode.workspace.fs
				.createDirectory(vscode.Uri.file('TestModule'))
				.then(
					() => console.log('created'),
					err => {
						console.log(err);
						vscode.window.showErrorMessage(err.message);
					}
				);
			// vscode.workspace.fs
			// 	.writeFile(
			// 		vscode.Uri.file(`./TestModule/index.js`),
			// 		str2ab('hello world')
			// 	)
			// 	.then(
			// 		() => console.log('created'),
			// 		err => vscode.window.showErrorMessage(err)
			// 	);
			break;
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
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "create-module" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'extension.createModule',
		function() {
			// The code you place here will be executed every time your command is executed
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
			const quickPick = vscode.window.createQuickPick();
			quickPick.items = options;
			quickPick.onDidChangeSelection(async selection => {
				// @ts-ignore
				await handleSelection(context, selection[0]);
				quickPick.dispose();
			});
			quickPick.onDidHide(() => quickPick.dispose());
			quickPick.show();
			// Display a message box to the user
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
