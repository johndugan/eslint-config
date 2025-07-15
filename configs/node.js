import {createRequire} from 'node:module';
import js from '@eslint/js';
import globals from 'globals';

const requireCJS = createRequire(import.meta.url);
const {createNodeConfig} = requireCJS('./config.cjs');

export default createNodeConfig(js, globals);
