import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {ESLint} from 'eslint';
import globals from 'globals';
import {describe, expect, it} from 'vitest';
import factory from '../configs/config.cjs';

const {createConfig} = factory;

const testDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(testDir, '..');
const fixturesDir = path.join(testDir, 'fixtures');

const lintFixture = async (fileName) => {
    const eslint = new ESLint({
        cwd: rootDir,
        overrideConfig: createConfig(js, globals),
        overrideConfigFile: true
    });

    return await eslint.lintFiles([path.join(fixturesDir, fileName)]);
};

describe('ESLint Integration Tests', () => {
    describe('Config Integration', () => {
        it('should create a valid flat config array', () => {
            const config = createConfig(js, globals);

            expect(Array.isArray(config)).toBe(true);
            expect(config.length).toBe(2);

            // First config should be ESLint recommended
            expect(config[0]).toBe(js.configs.recommended);

            // Second config should have our custom rules
            expect(config[1]).toHaveProperty('rules');
            expect(config[1]).toHaveProperty('languageOptions');
            expect(config[1]).toHaveProperty('plugins');
        });

        it('should have import and perfectionist plugins configured', () => {
            const config = createConfig(js, globals);
            const mainConfig = config[1];

            expect(mainConfig.plugins).toHaveProperty('import');
            expect(mainConfig.plugins).toHaveProperty('perfectionist');
            expect(mainConfig.rules).toHaveProperty(
                'perfectionist/sort-imports'
            );
            expect(mainConfig.rules).toHaveProperty(
                'perfectionist/sort-named-imports'
            );
            expect(mainConfig.rules).toHaveProperty(
                'perfectionist/sort-named-exports'
            );
            expect(mainConfig.rules).toHaveProperty('import/no-duplicates');
            expect(mainConfig.rules).toHaveProperty('import/exports-last');
            expect(mainConfig.rules).toHaveProperty('no-restricted-syntax');
        });

        it('should have proper language options', () => {
            const config = createConfig(js, globals);
            const mainConfig = config[1];

            expect(mainConfig.languageOptions.ecmaVersion).toBe('latest');
            expect(mainConfig.languageOptions.sourceType).toBe('module');
            expect(typeof mainConfig.languageOptions.globals).toBe('object');
        });

        it('should have import resolver settings', () => {
            const config = createConfig(js, globals);
            const mainConfig = config[1];

            expect(mainConfig.settings).toHaveProperty('import/resolver');
            expect(mainConfig.settings['import/resolver']).toHaveProperty(
                'node'
            );
        });

        it('allows overriding import alias options', () => {
            const internalPattern = ['^@app/'];
            const moduleDirectory = ['node_modules', 'app'];
            const config = createConfig(js, globals, {
                internalPattern: internalPattern,
                moduleDirectory: moduleDirectory
            });
            const mainConfig = config[1];

            expect(
                mainConfig.settings['import/resolver'].node.moduleDirectory
            ).toEqual(moduleDirectory);

            const sortImportsRule =
                mainConfig.rules['perfectionist/sort-imports'][1];

            expect(sortImportsRule.internalPattern).toEqual(internalPattern);
        });
    });

    describe('Lint behavior', () => {
        it('reports inline export violations', async () => {
            const [result] = await lintFixture('invalid-inline-export.js');

            expect(result.errorCount).toBeGreaterThan(0);
            expect(
                result.messages.some(
                    (message) => message.ruleId === 'no-restricted-syntax'
                )
            ).toBe(true);
        });

        it('enforces import sorting rules', async () => {
            const [result] = await lintFixture('invalid-import-order.js');

            expect(result.errorCount).toBeGreaterThan(0);
            expect(
                result.messages.some(
                    (message) => message.ruleId === 'perfectionist/sort-imports'
                )
            ).toBe(true);
        });

        it('allows compliant source files', async () => {
            const [result] = await lintFixture('valid.js');

            expect(result.errorCount).toBe(0);
            expect(result.warningCount).toBe(0);
        });
    });
});
