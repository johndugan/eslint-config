import {value} from './internal.js';
import fs from 'node:fs';
import chalk from 'chalk';

const result = value + (fs.existsSync('noop') ? 1 : 0) + chalk.level;

export {result};
