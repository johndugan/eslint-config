const js = require('@eslint/js');
const globals = require('globals');
const {createBrowserConfig} = require('./config.cjs');

module.exports = createBrowserConfig(js, globals);
