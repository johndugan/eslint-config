import {createRequire} from 'node:module';
import js from '@eslint/js';
import globals from 'globals';

const requireCJS = createRequire(import.meta.url);
const {createConfig} = requireCJS('./config.cjs');

export default createConfig(js, globals);
