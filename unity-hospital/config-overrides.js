const configUtils = require("./config-utils");

const override = (config, env) => {
  const { injectCustomSassLoaders } = configUtils(config);

  injectCustomSassLoaders();
  return config;
};

module.exports = override;
