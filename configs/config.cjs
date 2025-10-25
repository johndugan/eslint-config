const importPlugin = require('eslint-plugin-import');
const perfectionistPlugin = require('eslint-plugin-perfectionist');

/**
 * @typedef {import('eslint').Linter.Config} FlatConfig
 * @typedef {Record<string, 'readonly' | 'writable' | boolean>} GlobalConfig
 * @typedef {{internalPattern?: string[] | undefined, moduleDirectory?: string[] | undefined}} ImportCustomizationOptions
 */

const DEFAULT_INTERNAL_PATTERN = ['^@/', '^src/'];
const DEFAULT_MODULE_DIRECTORIES = ['node_modules', 'src'];

const resolveImportOptions = (options = {}) => ({
    internalPattern: Array.isArray(options.internalPattern)
        ? [...options.internalPattern]
        : [...DEFAULT_INTERNAL_PATTERN],
    moduleDirectory: Array.isArray(options.moduleDirectory)
        ? [...options.moduleDirectory]
        : [...DEFAULT_MODULE_DIRECTORIES]
});

// Shared rules configuration - works for both ESM and CommonJS
// Prettier-optimized: formatting rules removed to avoid conflicts
const rules = {
    'arrow-body-style': ['warn', 'as-needed'],
    'block-scoped-var': 'error',
    'consistent-return': 'warn',
    'constructor-super': 'error',
    curly: ['error', 'all'],
    'default-case': 'warn',
    'dot-notation': ['warn', {allowKeywords: true}],
    eqeqeq: 'warn',
    'new-cap': [
        'error',
        {
            newIsCap: true,
            capIsNew: true,
            newIsCapExceptions: [],
            capIsNewExceptions: []
        }
    ],
    'new-parens': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-confusing-arrow': ['error', {allowParens: true}],
    'no-console': 'warn',
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-div-regex': 'error',
    'no-dupe-class-members': 'error',
    'no-else-return': 'error',
    'no-empty-pattern': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-fallthrough': 'warn',
    'no-iterator': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'warn',
    'no-multi-str': 'warn',
    'no-global-assign': 'error', // Updated from deprecated no-native-reassign
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'error',
    'no-shadow': [
        'error',
        {
            builtinGlobals: true,
            hoist: 'all',
            allow: ['$', 'Plugin', 'self']
        }
    ],
    'no-shadow-restricted-names': 'error',
    'no-this-before-super': 'warn',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unneeded-ternary': 'warn',
    'no-unused-expressions': [
        'error',
        {allowShortCircuit: false, allowTernary: true}
    ],
    'no-unused-vars': [
        'error',
        {
            vars: 'all',
            args: 'after-used',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }
    ],
    'no-use-before-define': ['error', 'nofunc'],
    'no-useless-call': 'warn',
    'no-useless-concat': 'warn',
    'no-void': 'error',
    'no-with': 'error',
    'object-shorthand': ['warn', 'never'],
    'prefer-arrow-callback': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    radix: ['error', 'as-needed'],
    'require-await': 'error',
    'require-yield': 'error',
    'space-before-function-paren': 'off',
    'vars-on-top': 'warn',
    yoda: ['warn', 'never'],

    // Modern JavaScript & Best Practices
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
    'no-promise-executor-return': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': [
        'warn',
        {
            array: false,
            object: true
        },
        {
            enforceForRenamedProperties: false
        }
    ],
    'prefer-rest-params': 'error',
    'prefer-object-spread': 'warn',

    // Code Quality & Consistency
    camelcase: ['error', {properties: 'never'}],
    'no-lonely-if': 'warn',
    'no-unmodified-loop-condition': 'error',
    'no-useless-return': 'warn',
    'no-var': 'error',

    // Security & Error Prevention
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-rename': 'warn'
};

// Import/Export order and organization rules with perfectionist
const createImportRules = (importOptions) => ({
    // Perfectionist import sorting (replaces import/order)
    'perfectionist/sort-imports': [
        'error',
        {
            type: 'natural',
            order: 'asc',
            ignoreCase: true,
            newlinesBetween: 0, // No blank lines between groups per user request
            groups: [
                ['type-builtin', 'value-builtin'], // node:fs, node:path...
                ['type-external', 'value-external'], // npm packages
                ['type-internal', 'value-internal'], // aliases
                ['type-parent', 'type-sibling', 'type-index'], // ../ ./ index
                ['value-parent', 'value-sibling', 'value-index'],
                'unknown'
            ],
            internalPattern: importOptions.internalPattern // adjust to your aliases
        }
    ],
    'perfectionist/sort-named-imports': [
        'error',
        {
            type: 'natural',
            order: 'asc',
            ignoreCase: true
        }
    ],

    // Perfectionist export sorting
    'perfectionist/sort-named-exports': [
        'error',
        {
            type: 'natural',
            order: 'asc',
            ignoreCase: true
        }
    ],

    // Ban inline exports - enforce export { ... } at EOF only
    'no-restricted-syntax': [
        'error',
        {
            selector:
                'ExportNamedDeclaration[declaration.type="FunctionDeclaration"]',
            message:
                'Do not export function declarations. Declare locally and export at EOF via `export { … }`.'
        },
        {
            selector:
                'ExportNamedDeclaration[declaration.type="VariableDeclaration"]',
            message:
                'Do not export variables inline. Declare locally and export at EOF via `export { … }`.'
        },
        {
            selector:
                'ExportNamedDeclaration[declaration.type="ClassDeclaration"]',
            message:
                'Do not export classes inline. Export at EOF via `export { … }`.'
        }
    ],

    // Additional import rules (with safer defaults)
    'import/no-duplicates': 'error',
    'import/no-self-import': 'error',
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/no-anonymous-default-export': 'warn',

    // Disable problematic rules that cause false positives
    'import/no-unresolved': 'off' // Turn off as it causes issues with Node.js resolution
});

// Import and perfectionist plugin configuration with proper resolver
const createImportPluginConfig = (importOptions) => ({
    plugins: {
        import: importPlugin,
        perfectionist: perfectionistPlugin
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                moduleDirectory: importOptions.moduleDirectory
            }
        }
    }
});

// Shared global definitions to avoid duplication
const javascriptLanguageGlobals = {
    fetch: 'readonly',
    URLSearchParams: 'readonly',
    URL: 'readonly',
    AbortController: 'readonly',
    AbortSignal: 'readonly',
    FormData: 'readonly',
    Headers: 'readonly',
    Request: 'readonly',
    Response: 'readonly',
    atob: 'readonly',
    btoa: 'readonly',
    structuredClone: 'readonly'
};

const sharedTimerGlobals = {
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
    setInterval: 'readonly',
    clearInterval: 'readonly'
};

const nodeTimerGlobals = {
    ...sharedTimerGlobals,
    setImmediate: 'readonly',
    clearImmediate: 'readonly'
};

// Helper function to create base configuration
/**
 * Creates a reusable Flat config scaffold with shared plugins, language options, and rules.
 * @param {typeof import('@eslint/js')} js
 * @param {GlobalConfig} baseGlobals
 * @param {GlobalConfig} [additionalGlobals]
 * @param {ImportCustomizationOptions} [options]
 * @returns {FlatConfig[]}
 */
const createBaseConfig = (js, baseGlobals, additionalGlobals = {}, options) => {
    const importOptions = resolveImportOptions(options);
    const importPluginConfig = createImportPluginConfig(importOptions);
    const importRules = createImportRules(importOptions);

    return [
        js.configs.recommended,
        {
            ...importPluginConfig,
            languageOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                globals: {
                    ...baseGlobals,
                    ...additionalGlobals
                }
            },
            rules: {
                ...rules,
                ...importRules
            }
        }
    ];
};

/**
 * Builds the universal (Node + browser) preset.
 * @param {typeof import('@eslint/js')} js
 * @param {{node: GlobalConfig, browser: GlobalConfig, es2021: GlobalConfig}} globals
 * @param {ImportCustomizationOptions} [options]
 * @returns {FlatConfig[]}
 */
const createConfig = (js, globals, options) =>
    createBaseConfig(
        js,
        {
            ...globals.node,
            ...globals.browser,
            ...globals.es2021
        },
        {
            ...nodeTimerGlobals,
            ...javascriptLanguageGlobals
        },
        options
    );

/**
 * Builds a strict universal preset without Node.js or browser-specific globals.
 * @param {typeof import('@eslint/js')} js
 * @param {{es2021: GlobalConfig}} globals
 * @param {ImportCustomizationOptions} [options]
 * @returns {FlatConfig[]}
 */
const createStrictUniversalConfig = (js, globals, options) =>
    createBaseConfig(
        js,
        {
            ...globals.es2021
        },
        {
            ...sharedTimerGlobals,
            ...javascriptLanguageGlobals
        },
        options
    );

/**
 * Builds the Node.js only preset.
 * @param {typeof import('@eslint/js')} js
 * @param {{node: GlobalConfig, es2021: GlobalConfig}} globals
 * @param {ImportCustomizationOptions} [options]
 * @returns {FlatConfig[]}
 */
const createNodeConfig = (js, globals, options) =>
    createBaseConfig(
        js,
        {
            ...globals.node,
            ...globals.es2021
        },
        {
            ...nodeTimerGlobals
        },
        options
    );

/**
 * Builds the browser only preset.
 * @param {typeof import('@eslint/js')} js
 * @param {{browser: GlobalConfig, es2021: GlobalConfig}} globals
 * @param {ImportCustomizationOptions} [options]
 * @returns {FlatConfig[]}
 */
const createBrowserConfig = (js, globals, options) =>
    createBaseConfig(
        js,
        {
            ...globals.browser,
            ...globals.es2021
        },
        {
            ...javascriptLanguageGlobals
        },
        options
    );

// Support both ESM and CommonJS
module.exports = {
    createConfig: createConfig,
    createStrictUniversalConfig: createStrictUniversalConfig,
    createNodeConfig: createNodeConfig,
    createBrowserConfig: createBrowserConfig,
    rules: rules
};
