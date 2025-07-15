const js = require('@eslint/js');
const globals = require('globals');
const {createConfig} = require('./config.cjs');

module.exports = createConfig(js, globals);
