import {createRequire} from 'node:module';
import js from '@eslint/js';
import globals from 'globals';

const requireCJS = createRequire(import.meta.url);
const factory = requireCJS('./config.cjs');

const {
    createConfig,
    createStrictUniversalConfig,
    createNodeConfig,
    createBrowserConfig,
    rules
} = factory;

const buildUniversalConfig = (options) => createConfig(js, globals, options);
const buildUniversalStrictConfig = (options) =>
    createStrictUniversalConfig(js, globals, options);
const buildNodeConfig = (options) => createNodeConfig(js, globals, options);
const buildBrowserConfig = (options) =>
    createBrowserConfig(js, globals, options);

export {
    buildBrowserConfig,
    buildNodeConfig,
    buildUniversalConfig,
    buildUniversalStrictConfig,
    createBrowserConfig,
    createConfig,
    createNodeConfig,
    createStrictUniversalConfig,
    rules
};
