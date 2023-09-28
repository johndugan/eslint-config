# ESLint + Prettier Setup for VS Code

Below is my setup for ESLint and Prettier on VS Code.

## What it does

-   Lints JavaScript based on the latest standards
-   Fixes issues and formatting errors with Prettier
-   Lints + Fixes inside of html script tags
-   You can see all the [rules here](https://github.com/johndugan/eslint-config/blob/master/.eslintrc.js) - these generally abide by the code written in my courses. You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## ESLint Installation and Setup

1.  Install the [ESLint extension for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) by Dirk Baemer.
2.  Install NPM packages globally: `npm install --global eslint @johndugan/eslint-config @babel/core @babel/preset-env @babel/eslint-parser`

_A note on global vs local installation..._

You can implement eslint globally and/or locally per project. I recommend both. If you only install it locally/per project, then you won't get linting without some setup. I find it convenient to have linting setup regardless. That way, I can get right to coding and worry about project-specific eslint configuration later.

**At this point, ESLint is up and running in VS Code!**

## Prettier Integration and ESLint Global Defaults Setup

**NOTE:** You _do not_ need the Pretter extension for VS Code. My setup runs Prettier through ESLint as a plugin.

1. Create an `.eslintrc.json` configuration file in your user's home directory.

-   `~/.eslintrc.json` for Mac, Linux, and WSL
-   `C:\Users\username\.eslintrc.json` for Windows

2. Create an `.babelrc.json` configuration file in your user's home directory.

-   `~/.babelrc.json` for Mac, Linux, and WSL
-   `C:\Users\username\.babelrc.json` for Windows

3. Install NPM packages globally: `npm install --global eslint-config-prettier eslint-plugin-prettier`

Inside the `.eslintrc.json` file, create a json object similar to the one below. Any ESLint rules you want to add or overide from my `eslint-config-johndugan` configuration are defined in the `rules` object.

```
{
    // http://eslint.org/docs/user-guide/configuring#extending-configuration-files
    /*
        `prettier` Turns off all rules that are unnecessary or might conflict with Prettier.
     */
    "extends": ["@johndugan", "prettier"],

    // https://eslint.org/docs/user-guide/configuring#configuring-plugins
    /*
        `prettier` Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
     */
    "plugins": ["prettier"],

    "rules": {
        /*
            1. Render prettier formatting errors as warnings in ESLint.
            2. Prettier default settings object in case there is no .prettierrc.
            3. If there is a .prettierrc configuration file, use it. (recommended)
         */
        "prettier/prettier": [
            "warn",
            {
                "arrowParens": "always",
                "bracketSpacing": false,
                "endOfLine": "lf",
                "jsxSingleQuote": false,
                "printWidth": 80,
                "semi": true,
                "singleQuote": true,
                "tabWidth": 4,
                "useTabs": false,
                "trailingComma": "none"
            },
            {
                "usePrettierrc": true
            }
        ]
    }
}
```

Inside the `.babelrc.json` file, create a json object similar to the one below. Any Babel rules you want to add or overide are defined in the object.

```
{
    "presets": ["@babel/preset-env"]
}
```

**At this point, Prettier has been integrated with ESLint, and both ESLint and Prettier have your custom _global_ configuration!**

### VS Code Settings for ESLint & Prettier

I know that VS Code has shipped with a settings GUI for some time. But I've been on VS Code for a while, and still prefer updating the JSON settings object. You can reach by going to `Preferences > Settings`, then clicking the `{}` icon in the top right. Below are my settings relevant to ESLint.

```
{
    "editor.codeActionsOnSave": {
        "source.fixAll": true // applies to *all* linting & formatting providers
        // "source.fixAll.eslint": true // applies only to eslint
    },
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true
}
```

## Per Project Setup

I assume you're working on a project that has an exising `package.json` file. If not, `npm init`. Beyond that, the local/per project setup is very similar to the global setup.

1. Install the NPM packages locally `npm install --save-dev eslint @johndugan/eslint-config @babel/core @babel/preset-env @babel/eslint-parser eslint-config-prettier eslint-plugin-prettier`

2. Add your project-level ESLint configuration to a `.eslintrc.json` file in the project root. Use the example above as a blueprint.

3. Add your project-level ESLint configuration to a `.babelrc.json` file in the project root. Use the example above as a blueprint.

4. Add your project-level Prettier configuration to a `.prettierrc` file in the project root. Read about the [configuration file](https://prettier.io/docs/en/configuration.html) and [configuration options](https://prettier.io/docs/en/options.html) in the Prettier docs.
