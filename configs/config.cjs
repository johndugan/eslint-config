const importPlugin = require('eslint-plugin-import');

// Shared rules configuration - works for both ESM and CommonJS
const rules = {
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['warn', {before: true, after: true}],
    'block-scoped-var': 'error',
    'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
    'comma-dangle': ['warn', 'never'],
    'comma-spacing': ['warn', {before: false, after: true}],
    'consistent-return': 'warn',
    'constructor-super': 'error',
    curly: ['error', 'all'],
    'default-case': 'warn',
    'dot-notation': ['warn', {allowKeywords: true}],
    'eol-last': 'warn',
    eqeqeq: 'warn',
    indent: ['warn', 4, {SwitchCase: 1}],
    'key-spacing': ['warn', {beforeColon: false, afterColon: true}],
    'keyword-spacing': ['warn', {before: true, after: true}],
    'linebreak-style': ['warn', 'unix'],
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
    'no-extra-parens': ['warn', 'functions'],
    'no-fallthrough': 'warn',
    'no-iterator': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'warn',
    'no-multi-spaces': 'warn',
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
    'func-call-spacing': 'error', // Updated from deprecated no-spaced-func
    'no-this-before-super': 'warn',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'warn',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unneeded-ternary': 'warn',
    'no-unexpected-multiline': 'error',
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
    'object-curly-spacing': ['warn', 'never'],
    'object-shorthand': ['warn', 'never'],
    'prefer-arrow-callback': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    quotes: ['warn', 'single', {avoidEscape: true}],
    radix: ['error', 'as-needed'],
    'require-await': 'error',
    'require-yield': 'error',
    semi: ['error', 'always'],
    'semi-spacing': ['warn', {before: false, after: true}],
    'space-before-blocks': ['warn', {functions: 'always', keywords: 'always'}],
    'space-before-function-paren': 'off',
    'space-in-parens': ['warn', 'never'],
    'space-unary-ops': ['warn', {words: true, nonwords: false}],
    'spaced-comment': ['warn', 'always', {exceptions: ['!']}],
    'vars-on-top': 'warn',
    'wrap-iife': ['warn', 'outside'],
    'wrap-regex': 'warn',
    yoda: ['warn', 'never'],
    // Import order and organization
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
    ]
};

const createConfig = (js, globals) => [
    js.configs.recommended,
    {
        plugins: {
            import: importPlugin
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2021,
                // Additional Node.js globals
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                setImmediate: 'readonly',
                clearImmediate: 'readonly',
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
            }
        },
        rules: rules
    }
];

const createNodeConfig = (js, globals) => [
    js.configs.recommended,
    {
        plugins: {
            import: importPlugin
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.es2021,
                // Node.js specific globals only
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                setImmediate: 'readonly',
                clearImmediate: 'readonly',
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
            }
        },
        rules: rules
    }
];

const createBrowserConfig = (js, globals) => [
    js.configs.recommended,
    {
        plugins: {
            import: importPlugin
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                // Browser-specific globals only (no Node.js globals)
                // Modern browser APIs
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
            }
        },
        rules: rules
    }
];

// Support both ESM and CommonJS
module.exports = {
    createConfig: createConfig,
    createNodeConfig: createNodeConfig,
    createBrowserConfig: createBrowserConfig,
    rules: rules
};
