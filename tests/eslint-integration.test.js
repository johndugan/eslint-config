import {describe, it, expect} from 'vitest';
import js from '@eslint/js';
import globals from 'globals';
import {createConfig} from '../configs/config.cjs';

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

        it('should have import plugin configured', () => {
            const config = createConfig(js, globals);
            const mainConfig = config[1];

            expect(mainConfig.plugins).toHaveProperty('import');
            expect(mainConfig.rules).toHaveProperty('import/order');
            expect(mainConfig.rules).toHaveProperty('import/no-duplicates');
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
    });
});
