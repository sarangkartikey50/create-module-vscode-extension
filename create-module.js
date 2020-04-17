const shell = require("shelljs");
const fs = require("fs");
const chalk = require("chalk");
const { camelCase, paramCase } = require("change-case");
shell.config.execPath = String(shell.which("node"));

const {
  createComponent,
  createComponentScss,
  createPage,
  createPageScss,
  createSaga,
  createConstants,
  createActions,
  createReducer,
  createTestsActions,
  createTestsReducer,
  createTestsSaga,
  createTestsIndex,
  createTestsPage,
  createTestsComponent,
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

const createComponentTest = (name, cwd = "", moduleName) => {
  const fileName = `${name}.test.js`;
  shell.exec(`touch ${fileName}`, { cwd });
  const content = createTestsComponent(moduleName, name);
  writeFile(cwd + fileName, content);
}

const createPageTest = (name, cwd = "", moduleName) => {
  const fileName = `${name}.test.js`;
  shell.exec(`touch ${fileName}`, { cwd });
  const content = createTestsPage(moduleName, name);
  writeFile(cwd + fileName, content);
}

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
    pageString += `    ${page}Page: '/${paramCase(name)}/${paramCase(page)}/',\n`;
    importString += `import ${page} from '${name}/Pages/${page}';\n`;
    routeString += `        <Route path={routesPath.${page}Page} component={${page}} />\n`;
  });
  insertDataInFile(`${config.workspace}${config.routePaths}`, [
    {
      indexCallBack: data => data.indexOf("\n", data.lastIndexOf(",")) + 1,
      str: `\n    /* ${name} Page */
    ${name}Page: '/${paramCase(name)}/',\n${pageString}`
    }
  ]);
  insertDataInFile(`${config.workspace}${config.routes}`, [
    {
      indexCallBack: findImportIndex,
      str: `\n /* ${name} Page */
import ${name} from '${name}';
${importString}`
    },
    {
      indexCallBack: data => data.indexOf("\n", data.lastIndexOf("/>", data.indexOf("Unused Currently"))) + 1,
      str: `\n        {/* ${name} */}
        <Route exact path={routesPath.${name}Page} component={${name}} />\n${routeString}`
    }
  ]);
}

const createModule = (config, name, components = [], pages = []) => {
  const modulePath = `${config.modulePath}${name}/`;
  const componentsPath = `${modulePath}Components/`;
  const testsPath = `${modulePath}__tests__/`;
  const testsMockPath = `${modulePath}__tests__/__mocks__/`;
  const testsComponentsPath = `${modulePath}__tests__/__components__/`;
  const testsPagesPath = `${modulePath}__tests__/__pages__/`;
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
  shell.exec(`rm -rf ${testsPath}`);
  shell.exec(`mkdir ${testsPath}`);
  shell.exec(`rm -rf ${testsMockPath}`);
  shell.exec(`mkdir ${testsMockPath}`);
  createModuleTestsActionsJs(`${testsPath}actions.test.js`, name);
  createModuleTestsReducerJs(`${testsPath}reducer.test.js`, name);
  createModuleTestsSagaJs(`${testsPath}saga.test.js`, name);
  createModuleTestsIndexJs(`${testsPath}index.test.js`, name);
  if (components.length) {
    shell.exec(`rm -rf ${componentsPath}`);
    shell.exec(`mkdir ${componentsPath}`);
    shell.exec(`rm -rf ${testsComponentsPath}`);
    shell.exec(`mkdir ${testsComponentsPath}`);
    components.forEach(component => {
      createFunctionalComponent(
        component,
        createComponentIndexJs,
        createComponentIndexScss,
        componentsPath,
        name
      )
      createComponentTest(component, testsComponentsPath, name);
      });
  }
  if (pages.length) {
    shell.exec(`rm -rf ${pagesPath}`);
    shell.exec(`mkdir ${pagesPath}`);
    shell.exec(`rm -rf ${testsPagesPath}`);
    shell.exec(`mkdir ${testsPagesPath}`);
    pages.forEach(page => {
      createFunctionalComponent(
        page,
        createPageIndexJs,
        createPageIndexScss,
        pagesPath,
        name
      )
      createPageTest(page, testsPagesPath, name);
      });
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

const createModuleTestsActionsJs = (path, name) => {
  const content = createTestsActions(name);
  writeFile(path, content);
}

const createModuleTestsReducerJs = (path, name) => {
  const content = createTestsReducer(name);
  writeFile(path, content);
}

const createModuleTestsSagaJs = (path, name) => {
  const content = createTestsSaga(name);
  writeFile(path, content);
}

const createModuleTestsIndexJs = (path, name) => {
  const content = createTestsIndex(name);
  writeFile(path, content);
}

module.exports = {
  createModule,
  createFunctionalComponent,
  createComponentIndexJs,
  createComponentIndexScss,
  createPageIndexJs,
  createPageIndexScss
};
