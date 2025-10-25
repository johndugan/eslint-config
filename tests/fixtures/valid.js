import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import {value} from './internal.js';

const workspacePath = path.join('tmp', `${value}`);

function ensureLocation() {
    if (!fs.existsSync(workspacePath)) {
        return chalk.bold(workspacePath);
    }

    return chalk.dim(workspacePath);
}

export {ensureLocation, workspacePath};
