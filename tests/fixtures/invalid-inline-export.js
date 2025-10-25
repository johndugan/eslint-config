export const invalidExport = () => 'inline';

import fs from 'node:fs';
import chalk from 'chalk';

fs.existsSync('noop');
chalk.bold('noop');
