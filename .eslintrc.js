module.exports = {
    // http://eslint.org/docs/user-guide/configuring#extending-configuration-files
    extends: ['eslint:recommended'],

    // https://eslint.org/docs/user-guide/configuring#specifying-parser
    parser: '@babel/eslint-parser',

    // http://eslint.org/docs/user-guide/configuring#specifying-parser-options
    parserOptions: {
        requireConfigFile: false // https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser#additional-parser-configuration
    },

    // http://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        node: true,
        browser: true,
        es2021: true
    },

    // http://eslint.org/docs/rules/
    rules: {
        'arrow-body-style': ['warn', 'as-needed'],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['warn', {before: true, after: true}],
        'block-scoped-var': 'error',
        'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
        'comma-dangle': ['warn', 'never'],
        'comma-spacing': ['warn', {before: false, after: true}],
        'consistent-return': 'warn',
        'constructor-super': 'error',
        'curly': ['error', 'all'],
        'default-case': 'warn',
        'dot-notation': ['warn', {allowKeywords: true}],
        'eol-last': 'warn',
        'eqeqeq': 'warn',
        'indent': ['warn', 4, {SwitchCase: 1}],
        'key-spacing': ['warn', {beforeColon: false, afterColon: true}],
        'keyword-spacing': ['warn', {before: true, after: true}],
        'linebreak-style': ['warn', 'unix'],
        'new-cap': ['error', {
            newIsCap: true,
            capIsNew: true,
            newIsCapExceptions: [],
            capIsNewExceptions: []
        }],
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
        'no-multi-spaces': 'warn', // flags variable `=` alignment
        'no-multi-str': 'warn',
        'no-native-reassign': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        // "no-param-reassign": 'error', // flags `myNum += 1`
        'no-proto': 'error',
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'warn',
        'no-self-compare': 'warn',
        'no-sequences': 'error',
        'no-shadow': ['error', {
            builtinGlobals: true,
            hoist: 'all',
            allow: ['$', 'Plugin', 'self']
        }],
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'error',
        'no-this-before-super': 'warn',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'warn',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'error',
        'no-unneeded-ternary': 'warn',
        'no-unexpected-multiline': 'error',
        'no-unused-expressions': ['error', {allowShortCircuit: false, allowTernary: true}],
        'no-unused-vars': ['error', {vars: 'all', args: 'after-used'}],
        'no-use-before-define': ['error', 'nofunc'], // exception for function declarations
        'no-useless-call': 'warn',
        'no-useless-concat': 'warn',
        'no-void': 'error',
        'no-with': 'error',
        'object-curly-spacing': ['warn', 'never'],
        'object-shorthand': ['warn', 'never'],
        'prefer-arrow-callback': 'warn',
        'prefer-spread': 'warn',
        'prefer-template': 'warn',
        'quotes': ['warn', 'single', {avoidEscape: true}],
        'radix': ['error', 'as-needed'],
        'require-await': 'error',
        'require-yield': 'error',
        'semi': ['error', 'always'],
        'semi-spacing': ['warn', {before: false, after: true}],
        'space-before-blocks': ['warn', {functions: 'always', keywords: 'always'}],
        'space-before-function-paren': 'off', // Prettier handles this
        'space-in-parens': ['warn', 'never'],
        // "space-infix-ops": 'warn', // flags `'str'+'ing'`
        'space-unary-ops': ['warn', {words: true, nonwords: false}],
        'spaced-comment': ['warn', 'always', {exceptions: ['!']}], // exception for `!`
        'vars-on-top': 'warn',
        'wrap-iife': ['warn', 'outside'],
        'wrap-regex': 'warn',
        'yoda': ['warn', 'never']
    }
};
