import {createRequire} from 'node:module';
import js from '@eslint/js';
import globals from 'globals';

const requireCJS = createRequire(import.meta.url);
const {createBrowserConfig} = requireCJS('./config.cjs');

export default createBrowserConfig(js, globals);
