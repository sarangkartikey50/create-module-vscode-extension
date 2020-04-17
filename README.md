# Create react module

With this extension you'll be able generates module with pre-defined templates.

## Features

1. This extension provides three options:
    a. Create a module - which will create a module.
    b. Create a page - which will create a page inside a specified module.
    c. Create a component - which will create a component inside a specified module.

2. The module structure is as follows:
    a. index.js - This is the entry file for module.
    b. index.scss - Corresponding scss file for index.js.
    c. constants - This is where all the constants for the modules are declared.
    d. actions - This is where are the redux actions are declared.
    e. reducer - This contains the state of the module.
    f. saga - This where saga generators are declared.
    g. Components - This is where all the components are declared.
    h. Pages - This is where all the pages for the modules are declared.

3. Following files are modified:
    a. Root reducer (/src/reducers.js). 
    b. Root saga (/src/sagas.js).
    c. routePaths.js (new route paths are added for the module and pages).
    d. Routes.js (new routes are added for the module and pages).
    

## Requirements

1. Before using the any of the commands, you have to create the config file. Where you have to mention following things:
    a. Select the workspace where you want to create modules.
    b. module path: Where are the modules are created (/src/modules/).
    c. sagas path: Where all the sagas are combined (/src/sagas.js).
    d. reducers path: Where all the reducers are combined (/src/reducers.js).
    e. routePaths path: Where all the route paths are declared (/src/routePaths.js).
    f. Routes path: Where all the routes are declared (/src/Routes.js).

2. After adding the configurations, a config file will be created inside the workspace/.vscode.

-----------------------------------------------------------------------------------------------------------

**Cheers!**
