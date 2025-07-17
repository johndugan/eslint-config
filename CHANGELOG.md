# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-07-17

### Added
- Comprehensive test suite with Vitest (19 tests covering config integrity)
- Development tooling with proper npm scripts for linting, formatting, and testing
- Prettier compatibility verification in tests
- Environment-specific configuration testing

### Changed
- **Prettier Optimization**: Removed 28 formatting rules that conflict with Prettier for better developer experience
- Updated README with development section and testing documentation
- Improved package scripts with targeted paths for better performance

### Fixed
- ESLint configuration for proper self-linting of the package
- Package scripts to work correctly with ESLint 9.x command-line interface

## [3.0.0] - 2025-07-15

### Added
- Support for ESLint 9.x with flat config format
- ESM-first module support with CommonJS compatibility
- Modern Node.js globals (fetch, URLSearchParams, etc.)
- Support for ECMAScript 2022 features including top-level await
- Underscore-prefixed variable ignoring in unused variable checks
- Dual export support (ESM and CommonJS)
- Enhanced TypeScript integration capabilities
- Comprehensive migration guide from v2.x to v3.x

### Changed
- **BREAKING**: Minimum ESLint version now 9.0.0
- **BREAKING**: Configuration format changed from `.eslintrc.js` to flat config
- **BREAKING**: Package is now ESM-first with `"type": "module"` in package.json
- Updated deprecated rules:
  - `no-native-reassign` → `no-global-assign`
  - `no-spaced-func` → `func-call-spacing`
- Enhanced `no-unused-vars` rule to ignore underscore-prefixed variables
- Updated globals to use the `globals` package instead of manual definitions
- Parser options updated to support ECMAScript 2022

### Removed
- **BREAKING**: Dropped support for ESLint 8.x
- **BREAKING**: Removed legacy `.eslintrc.js` format support
- Removed manual environment globals in favor of `globals` package

## [2.4.7] - Previous Release
- Legacy ESLint configuration with `.eslintrc.js` format
- Support for ESLint 8.x
- Basic Node.js and browser environment support
