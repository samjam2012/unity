/**
 * @param styleVariables import variables to append to sass loaders
 *
 *
 * */
const path = require("path");

// const fs = require("fs");
// let paths = [];
// const parsePath = (partialUrl = "") => {
//   const pathArray = fs
//     .readdirSync(process.cwd() + "/src/pages" + partialUrl)
//     .filter(p => !p.includes("."));

//   pathArray.forEach(path => {
//     if (path[0] === path[0].toLowerCase()) {
//       paths.push(path);
//     } else {
//       parsePath(`${partialUrl}/${path}`);
//     }
//   });
// };

const utils = config => ({
  injectCustomSassLoaders: () => {
    const loaders = config.module.rules[2].oneOf;
    let cssLoader;
    let cssModuleLoader;
    let scssLoader;
    let scssModuleLoader;

    for (const loader of loaders) {
      if (!loader.loader) {
        if (loader.test.test(".scss")) {
          scssLoader = loader;
        }
        if (loader.test.test(".module.scss")) {
          scssModuleLoader = loader;
        }

        if (loader.test.test(".css")) {
          cssLoader = loader;
        }
        if (loader.test.test(".module.css")) {
          cssModuleLoader = loader;
        }
      }
    }

    // coerces all .scss files to act as modules
    addCustomSassOptions(scssLoader);
    addCustomSassOptions(scssModuleLoader);

    // attaches
    addGlobalSassVariables(scssLoader);
    addGlobalSassVariables(scssModuleLoader);
  }
  // findSubComponents: () => {
  //   parsePath();
  //   return paths;
  // }
});

const styleVariables = {
  sourceMap: false,
  prependData: `
    @import "${path.resolve(__dirname, "./src/app/styles/index.scss")}";
  `
};

const addCustomSassOptions = loader => {
  loader.use[1].options = {
    importLoaders: 2,
    modules: true
  };
};
const addGlobalSassVariables = loader => {
  loader.use[4].query = styleVariables;
  delete loader.use[4].options;
};

module.exports = utils;
