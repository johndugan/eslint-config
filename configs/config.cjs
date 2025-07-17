const importPlugin = require('eslint-plugin-import');

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

// Import order and organization rules
const importRules = {
    'import/order': [
        'error',
        {
            groups: [
                'builtin', // Node.js built-ins
                'external', // npm packages
                'internal', // Internal modules
                'parent', // ../
                'sibling', // ./
                'index' // ./index.js
            ],
            'newlines-between': 'never'
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
};

// Import plugin configuration with proper resolver
const importPluginConfig = {
    plugins: {
        import: importPlugin
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                moduleDirectory: ['node_modules', 'src']
            }
        }
    }
};

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

const nodeTimerGlobals = {
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
    setInterval: 'readonly',
    clearInterval: 'readonly',
    setImmediate: 'readonly',
    clearImmediate: 'readonly'
};

// Helper function to create base configuration
const createBaseConfig = (js, baseGlobals, additionalGlobals = {}) => [
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

const createConfig = (js, globals) =>
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
        }
    );

const createNodeConfig = (js, globals) =>
    createBaseConfig(
        js,
        {
            ...globals.node,
            ...globals.es2021
        },
        {
            ...nodeTimerGlobals
        }
    );

const createBrowserConfig = (js, globals) =>
    createBaseConfig(
        js,
        {
            ...globals.browser,
            ...globals.es2021
        },
        {
            ...javascriptLanguageGlobals
        }
    );

// Support both ESM and CommonJS
module.exports = {
    createConfig: createConfig,
    createNodeConfig: createNodeConfig,
    createBrowserConfig: createBrowserConfig,
    rules: rules
};
