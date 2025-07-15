# Migration Guide: v2.x to v3.x

This guide will help you migrate from `@johndugan/eslint-config` v2.x to v3.x.

## Overview

Version 3.x introduces support for ESLint 9.x and the new flat configuration format. This is a major release with breaking changes.

## Breaking Changes

### 1. ESLint Version Requirement
- **v2.x**: ESLint 8.x
- **v3.x**: ESLint 9.x (minimum 9.0.0)

### 2. Configuration Format
- **v2.x**: Legacy `.eslintrc.js` format
- **v3.x**: Flat config format with `eslint.config.js`

### 3. Module Format
- **v2.x**: CommonJS only
- **v3.x**: ESM-first with CommonJS compatibility

### 4. Unused Variables
- **v2.x**: All unused variables flagged
- **v3.x**: Underscore-prefixed variables ignored

## Step-by-Step Migration

### Step 1: Update Dependencies

```bash
# Update ESLint to 9.x
npm install --save-dev eslint@^9.0.0

# Update the config package
npm install --save-dev @johndugan/eslint-config@^3.0.0

# Install new required dependency
npm install --save-dev globals
```

### Step 2: Update Configuration File

Delete your old `.eslintrc.js` file and create a new `eslint.config.js`:

**Old (.eslintrc.js)**:
```javascript
module.exports = {
    extends: ['@johndugan/eslint-config'],
    rules: {
        'no-console': 'off',
        'indent': ['error', 2]
    }
};
```

**New (eslint.config.js)**:
```javascript
import johnduganConfig from '@johndugan/eslint-config';

export default [
    ...johnduganConfig,
    {
        rules: {
            'no-console': 'off',
            'indent': ['error', 2]
        }
    }
];
```

### Step 3: Update Package.json Scripts

Your lint scripts should work the same way:

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix"
    }
}
```

### Step 4: Handle File Patterns (if needed)

If you need to specify different configurations for different file types:

```javascript
import johnduganConfig from '@johndugan/eslint-config';

export default [
    ...johnduganConfig,
    {
        files: ['**/*.test.js', '**/*.spec.js'],
        rules: {
            'no-console': 'off'
        }
    },
    {
        files: ['scripts/**/*.js'],
        rules: {
            'no-process-exit': 'off'
        }
    }
];
```

### Step 5: Update Ignores

If you had `.eslintignore`, convert it to the config:

**Old (.eslintignore)**:
```
node_modules/
dist/
build/
```

**New (in eslint.config.js)**:
```javascript
import johnduganConfig from '@johndugan/eslint-config';

export default [
    {
        ignores: ['node_modules/', 'dist/', 'build/']
    },
    ...johnduganConfig
];
```

## CommonJS Projects

If your project uses CommonJS, create `eslint.config.js` with:

```javascript
const johnduganConfig = require('@johndugan/eslint-config');

module.exports = [
    ...johnduganConfig,
    {
        rules: {
            // Your overrides
        }
    }
];
```

## TypeScript Projects

For TypeScript support, install TypeScript ESLint:

```bash
npm install --save-dev typescript-eslint
```

Then configure:

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

## Testing Your Migration

1. Run your linter to check for any issues:
   ```bash
   npm run lint
   ```

2. Fix any new issues that arise from updated rules
3. Verify your build and test processes still work

## Common Issues and Solutions

### Issue: Import/require errors
**Solution**: Check that you're using the correct module format (ESM vs CommonJS)

### Issue: Globals not recognized
**Solution**: The new version includes more modern globals. If you have custom globals, add them to your config:

```javascript
export default [
    ...johnduganConfig,
    {
        languageOptions: {
            globals: {
                myCustomGlobal: 'readonly'
            }
        }
    }
];
```

### Issue: Rules not working as expected
**Solution**: Check if any rules were updated. See the CHANGELOG.md for specific rule changes.

## Need Help?

If you encounter issues during migration:

1. Check the [full documentation](README.md)
2. Review the [changelog](CHANGELOG.md)
3. Open an issue on the [GitHub repository](https://github.com/johndugan/eslint-config/issues)

## Benefits of v3.x

- Better performance with ESLint 9.x
- More flexible configuration options
- Modern JavaScript feature support
- Better TypeScript integration
- Improved developer experience
- Future-proof configuration format
