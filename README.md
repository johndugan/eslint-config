# ESLint Configuration for ESLint 9.x

John Dugan's ESLint configuration with flat config format support for ESLint 9.x.

## What it does

- Lints JavaScript based on the latest ECMAScript standards
- Provides environment-specific configurations (Node.js, Browser, Universal)
- Includes comprehensive rules for code style and best practices
- Provides proper globals for each environment without conflicts
- Ignores underscore-prefixed unused variables
- Uses ESLint's modern built-in parser (Espree) for maximum compatibility
- Supports all modern ECMAScript features including top-level await

## Features

- **ESLint 9.x Compatible**: Uses the new flat config format
- **Environment-Specific**: Node.js, Browser, and Universal configurations
- **Dual Module Support**: Works with both ESM and CommonJS projects
- **Smart Globals**: Right globals for each environment, no conflicts
- **Flexible Unused Variables**: Ignores underscore-prefixed variables
- **Modern JavaScript**: Full support for latest ECMAScript features
- **TypeScript Ready**: Can be easily extended for TypeScript projects
- **🆕 Advanced Import/Export Organization**: Comprehensive sorting and standardization
- **🚫 Inline Export Restrictions**: Enforces clean `export { ... }` statements at EOF only

## Installation

### Requirements

- **Node.js**: >= 22.17.0
- **ESLint**: >= 9.0.0

### For ESLint 9.x (v3.x)

```bash
npm install --save-dev eslint@^9.0.0 @johndugan/eslint-config@^3.0.0
```

### Dependencies

This configuration requires:
- **ESLint 9.x**: The linting engine
- **eslint-plugin-import**: For import/export validation and placement (automatically installed)
- **eslint-plugin-perfectionist**: For advanced import/export sorting (automatically installed)
- **@eslint/js**: ESLint's recommended JavaScript rules (automatically installed)
- **globals**: Environment-specific global variables (automatically installed)

**Import/Export Organization Features:**
- **Import grouping**: Node built-ins → external packages → internal modules → relative imports
- **Alphabetical sorting**: Within each import group, case-insensitive natural ordering
- **No blank lines**: Clean, compact import sections without spacing between groups
- **Named import sorting**: Alphabetizes destructured imports like `{ a, b, c }`
- **Export restrictions**: Bans inline exports (`export function`, `export const`) - enforces `export { ... }` at EOF only
- **Export sorting**: Alphabetizes names in export statements for consistency

No additional configuration is required! This package uses ESLint's built-in Espree parser which supports all modern JavaScript features.

## Usage

### Universal Configuration (Default)

For projects that run in both Node.js and browser environments:

```javascript
import johnduganConfig from '@johndugan/eslint-config';

export default johnduganConfig;
```

### Node.js Applications

For Node.js-only applications (CLI tools, servers, etc.):

```javascript
import johnduganConfig from '@johndugan/eslint-config/node';

export default johnduganConfig;
```

### Browser Applications

For browser-only applications (React, Vue, vanilla JS):

```javascript
import johnduganConfig from '@johndugan/eslint-config/browser';

export default johnduganConfig;
```

### CommonJS Projects

For CommonJS projects, use the `.cjs` versions:

```javascript
const johnduganConfig = require('@johndugan/eslint-config');
// or
const johnduganConfig = require('@johndugan/eslint-config/node');
// or
const johnduganConfig = require('@johndugan/eslint-config/browser');

module.exports = johnduganConfig;
```

### With Custom Overrides

You can still add custom overrides to any configuration:

```javascript
import johnduganConfig from '@johndugan/eslint-config/node';

export default [
    ...johnduganConfig,
    {
        files: ['**/*.test.js'],
        rules: {
            'no-console': 'off'
        }
    }
];
```

## Environment-Specific Benefits

### 🖥️ **Node.js Config** (`/node`)

- **Includes**: Node.js globals (`process`, `Buffer`, `__dirname`, etc.)
- **Excludes**: Browser globals (`window`, `document`, `model`, `blur`, etc.)
- **Best for**: CLI tools, servers, build scripts
- **Prevents**: Browser global shadowing warnings

### 🌐 **Browser Config** (`/browser`)

- **Includes**: Browser globals (`window`, `document`, `fetch`, etc.)
- **Excludes**: Node.js globals (`process`, `Buffer`, `require`, etc.)
- **Best for**: React apps, Vue apps, vanilla JS web apps
- **Prevents**: Node.js global shadowing warnings

### 🔄 **Universal Config** (default)

- **Includes**: Both Node.js and browser globals
- **Best for**: Full-stack applications, libraries, Electron apps
- **Trade-off**: May have occasional global shadowing conflicts

### TypeScript Support

For TypeScript projects, you can extend the configuration:

```javascript
import johnduganConfig from '@johndugan/eslint-config';
import tseslint from 'typescript-eslint';

export default [
    ...johnduganConfig,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            // TypeScript-specific rules
        }
    }
];
```

## Migration from v2.x to v3.x

### Breaking Changes

1. **ESLint Version**: Now requires ESLint 9.x (minimum 9.0.0)
2. **Configuration Format**: Uses flat config instead of `.eslintrc.js`
3. **Module Format**: Package is now ESM-first with CommonJS compatibility
4. **Globals**: Updated to use the `globals` package for environment globals
5. **Unused Variables**: Now ignores underscore-prefixed variables by default

### Migration Steps

1. **Update ESLint**: Upgrade to ESLint 9.x

    ```bash
    npm install --save-dev eslint@^9.0.0
    ```

2. **Update Config Package**: Upgrade to v3.x

    ```bash
    npm install --save-dev @johndugan/eslint-config@^3.0.0
    ```

3. **Install New Dependencies**:

    ```bash
    npm install --save-dev globals
    ```

4. **Convert Configuration**: Replace your `.eslintrc.js` with `eslint.config.js`

    **Old (v2.x)**:

    ```javascript
    // .eslintrc.js
    module.exports = {
        extends: ['@johndugan/eslint-config'],
        rules: {
            'no-console': 'off'
        }
    };
    ```

    **New (v3.x)**:

    ```javascript
    // eslint.config.js
    import johnduganConfig from '@johndugan/eslint-config';

    export default [
        ...johnduganConfig,
        {
            rules: {
                'no-console': 'off'
            }
        }
    ];
    ```

5. **Update Scripts**: ESLint 9.x automatically looks for `eslint.config.js`
    ```json
    {
        "scripts": {
            "lint": "eslint .",
            "lint:fix": "eslint . --fix"
        }
    }
    ```

## Rules Overview

This configuration extends `@eslint/js` recommended rules and adds custom rules for:

- **Code Style**: Consistent spacing, quotes, semicolons
- **Best Practices**: Avoiding common pitfalls and anti-patterns
- **ES2022+ Features**: Support for modern JavaScript features
- **Error Prevention**: Catching potential bugs and issues
- **Import/Export Organization**: Comprehensive import grouping, sorting, and export standardization
- **Module Structure**: Enforced clean export patterns with end-of-file export statements

### Key Rule Changes in v3.x

- `no-native-reassign` → `no-global-assign` (updated to non-deprecated rule)
- `no-spaced-func` → `func-call-spacing` (updated to non-deprecated rule)
- `no-unused-vars`: Now ignores underscore-prefixed variables
- Enhanced globals for modern Node.js and browser APIs

### New in v3.2.0: Advanced Import/Export Control

- **eslint-plugin-perfectionist**: Replaces basic import ordering with comprehensive sorting
- **Import grouping**: Node built-ins → external → internal → relative (no blank lines between)
- **Export restrictions**: `no-restricted-syntax` bans inline exports (`export function`, `export const`)
- **Export placement**: `import/exports-last` enforces exports at end of file only
- **Alphabetical sorting**: All import/export names automatically sorted for consistency

## Environment Support

- **Node.js**: Full support with modern globals
- **Browser**: Complete browser environment support
- **ES2022**: Latest ECMAScript features including top-level await
- **Babel**: Full transpilation support for cutting-edge features

## Contributing

Issues and pull requests are welcome! Please ensure your code follows the existing style and includes appropriate tests.

## License

MIT © John Dugan
## Development

### Testing

This package includes comprehensive tests to ensure configuration integrity:

```bash
# Run tests
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### Linting & Formatting

```bash
# Lint the package itself
npm run lint

# Format code with Prettier
npm run format
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and detailed release notes.
