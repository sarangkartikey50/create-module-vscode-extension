const shell = require("shelljs");
const fs = require("fs");
const chalk = require("chalk");
const { camelCase } = require("change-case");
shell.config.execPath = String(shell.which("node"));

const {
  createComponent,
  createComponentScss,
  createPage,
  createPageScss,
  createSaga,
  createConstants,
  createActions,
  createReducer
} = require("./templates");

const findImportIndex = data =>
  data.indexOf("\n", data.lastIndexOf("import")) + 1;

const insertStringAt = (index, str, strToBeAdded) => {
  return str.slice(0, index) + strToBeAdded + str.slice(index);
};

const writeFile = (path, content) => {
  fs.writeFile(path, content, function(err) {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const insertDataInFile = (path, updates) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    updates.forEach(({ indexCallBack, str }) => {
      data = insertStringAt(indexCallBack(data), data, str);
    });
    writeFile(path, data);
  });
};

const createFunctionalComponent = (
  name,
  createIndexJs,
  createIndexScss,
  cwd = "",
  moduleName
) => {
  const componentPath = `${name}/`;
  shell.exec(`rm -rf ${name}`, { cwd });
  shell.exec(`mkdir ${name}`, { cwd });
  shell.exec(`touch ./${name}/index.js`, { cwd });
  createIndexJs(name, `${componentPath}index.js`, cwd, moduleName);
  shell.exec(`touch ./${name}/index.scss`, { cwd });
  createIndexScss(`${componentPath}index.scss`, cwd);
  shell.echo(chalk.blue(`${name} component created.`));
};

const updateRootReducer = (config, name) => {
  insertDataInFile(`${config.workspace}${config.rootReducersPath}`, [
    {
      indexCallBack: findImportIndex,
      str: `import ${camelCase(name)} from '${name}/reducer';\n`
    },
    {
      indexCallBack: data => data.indexOf("\n", data.lastIndexOf(",")) + 1,
      str: `    ${camelCase(name)},\n`
    }
  ]);
};

const updateRootSaga = (config, name) => {
  insertDataInFile(`${config.workspace}${config.rootSagaPath}`, [
    {
      indexCallBack: findImportIndex,
      str: `import ${name}Saga from '${name}/saga';\n`
    },
    {
      indexCallBack: data => data.indexOf("\n", data.lastIndexOf(",")) + 1,
      str: `        ...${name}Saga,\n`
    }
  ]);
};

const updateRoutes = (config, name, pages) => {
  let pageString = '',
  importString = '',
  routeString = '';
  pages.forEach(page => {
    pageString += `    ${page}Page: '/${name}/${page}/',\n`;
    importString += `import ${page} from '${name}/Pages/${page}';\n`;
    routeString += `        <Route path={routesPath.${page}Page} component={${page}} />\n`;
  });
  insertDataInFile(`${config.workspace}${config.routePaths}`, [
    {
      indexCallBack: data => data.indexOf("\n", data.lastIndexOf(",")) + 1,
      str: `\n    /* ${name} Page */
    ${name}Page: '/${name}/',\n${pageString}`
    }
  ]);
  insertDataInFile(`${config.workspace}${config.routes}`, [
    {
      indexCallBack: findImportIndex,
      str: `import ${name} from '${name}';
${importString}`
    },
    {
      indexCallBack: data => data.indexOf("\n", data.lastIndexOf("/>")) + 1,
      str: `\n        {/* ${name} */}
        <Route path={routesPath.${name}Page} component={${name}} />\n${routeString}`
    }
  ]);
}

const createModule = (config, name, components = [], pages = []) => {
  const modulePath = `${config.modulePath}${name}/`;
  const componentsPath = `${modulePath}Components/`;
  const pagesPath = `${modulePath}Pages/`;
  shell.exec(`rm -rf ${modulePath}`);
  shell.exec(`mkdir ${modulePath}`);
  shell.exec(`touch ${modulePath}index.js`);
  createPageIndexJs(name, `${modulePath}index.js`, '', name);
  shell.exec(`touch ${modulePath}index.scss`);
  createPageIndexScss(`${modulePath}index.scss`);
  shell.exec(`touch ${modulePath}saga.js`);
  createModuleSagaJs(`${modulePath}saga.js`);
  shell.exec(`touch ${modulePath}constants.js`);
  createModuleConstantsJs(`${modulePath}constants.js`);
  shell.exec(`touch ${modulePath}actions.js`);
  createModuleActionsJs(`${modulePath}actions.js`);
  shell.exec(`touch ${modulePath}reducer.js`);
  createModuleReducerJs(`${modulePath}reducer.js`);
  if (components.length) {
    shell.exec(`rm -rf ${componentsPath}`);
    shell.exec(`mkdir ${componentsPath}`);
    components.forEach(component =>
      createFunctionalComponent(
        component,
        createComponentIndexJs,
        createComponentIndexScss,
        componentsPath,
        name
      )
    );
  }
  if (pages.length) {
    shell.exec(`rm -rf ${pagesPath}`);
    shell.exec(`mkdir ${pagesPath}`);
    pages.forEach(page =>
      createFunctionalComponent(
        page,
        createPageIndexJs,
        createPageIndexScss,
        pagesPath,
        name
      )
    );
  }
  updateRootReducer(config, name);
  shell.echo(chalk.green(`${name} Reducer added in rootReducer.`));
  updateRootSaga(config, name);
  shell.echo(chalk.green(`${name}Saga added in rootSaga.`));
  updateRoutes(config, name, pages);
  shell.echo(chalk.blue(`${name} module created.`));
};

const createComponentIndexJs = (name, path, cwd = "") => {
  const content = createComponent(name);
  if (cwd) {
    path = `${cwd + path}`;
  }
  writeFile(path, content);
};

const createPageIndexJs = (name, path, cwd = "", moduleName) => {
  const content = createPage(name, moduleName);
  if (cwd) {
    path = `${cwd + path}`;
  }
  writeFile(path, content);
};

const createComponentIndexScss = (path, cwd = "") => {
  const content = createComponentScss();
  if (cwd) {
    path = `${cwd + path}`;
  }
  writeFile(path, content);
};

const createPageIndexScss = (path, cwd = "") => {
  const content = createPageScss();
  if (cwd) {
    path = `${cwd + path}`;
  }
  writeFile(path, content);
};

const createModuleSagaJs = path => {
  const content = createSaga();
  writeFile(path, content);
};

const createModuleConstantsJs = path => {
  const content = createConstants();
  writeFile(path, content);
};

const createModuleActionsJs = path => {
  const content = createActions();
  writeFile(path, content);
};

const createModuleReducerJs = path => {
  const content = createReducer();
  writeFile(path, content);
};

module.exports = {
  createModule,
  createFunctionalComponent,
  createComponentIndexJs,
  createComponentIndexScss,
  createPageIndexJs,
  createPageIndexScss
};
