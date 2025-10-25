const js = require('@eslint/js');
const globals = require('globals');
const factory = require('./config.cjs');

const buildUniversalConfig = (options) =>
    factory.createConfig(js, globals, options);
const buildUniversalStrictConfig = (options) =>
    factory.createStrictUniversalConfig(js, globals, options);
const buildNodeConfig = (options) =>
    factory.createNodeConfig(js, globals, options);
const buildBrowserConfig = (options) =>
    factory.createBrowserConfig(js, globals, options);

module.exports = {
    ...factory,
    buildUniversalConfig: buildUniversalConfig,
    buildUniversalStrictConfig: buildUniversalStrictConfig,
    buildNodeConfig: buildNodeConfig,
    buildBrowserConfig: buildBrowserConfig
};
