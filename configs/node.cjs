const js = require('@eslint/js');
const globals = require('globals');
const {createNodeConfig} = require('./config.cjs');

module.exports = createNodeConfig(js, globals);
