import {describe, it, expect} from 'vitest';
import js from '@eslint/js';
import globals from 'globals';
import {
    createConfig,
    createNodeConfig,
    createBrowserConfig
} from '../configs/config.cjs';

describe('ESLint Config Tests', () => {
    describe('Config Loading', () => {
        it('should load universal config without errors', () => {
            expect(() => createConfig(js, globals)).not.toThrow();
        });

        it('should load Node.js config without errors', () => {
            expect(() => createNodeConfig(js, globals)).not.toThrow();
        });

        it('should load browser config without errors', () => {
            expect(() => createBrowserConfig(js, globals)).not.toThrow();
        });
    });

    describe('Config Structure', () => {
        it('should return an array of config objects', () => {
            const config = createConfig(js, globals);
            expect(Array.isArray(config)).toBe(true);
            expect(config.length).toBeGreaterThan(0);
        });

        it('should include ESLint recommended rules', () => {
            const config = createConfig(js, globals);
            expect(config[0]).toBe(js.configs.recommended);
        });

        it('should have rules object in config', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find((c) => c.rules);
            expect(mainConfig).toBeDefined();
            expect(typeof mainConfig.rules).toBe('object');
        });
    });

    describe('Environment-Specific Configs', () => {
        it('should have Node.js globals in Node config', () => {
            const config = createNodeConfig(js, globals);
            const mainConfig = config.find((c) => c.languageOptions?.globals);
            expect(mainConfig.languageOptions.globals).toHaveProperty(
                'process'
            );
            expect(mainConfig.languageOptions.globals).toHaveProperty('Buffer');
        });

        it('should have browser globals in browser config', () => {
            const config = createBrowserConfig(js, globals);
            const mainConfig = config.find((c) => c.languageOptions?.globals);
            expect(mainConfig.languageOptions.globals).toHaveProperty('window');
            expect(mainConfig.languageOptions.globals).toHaveProperty(
                'document'
            );
        });

        it('should have both Node and browser globals in universal config', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find((c) => c.languageOptions?.globals);
            expect(mainConfig.languageOptions.globals).toHaveProperty(
                'process'
            );
            expect(mainConfig.languageOptions.globals).toHaveProperty('window');
        });
    });

    describe('Prettier Compatibility', () => {
        it('should not include indent rule (Prettier conflict)', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find((c) => c.rules);
            expect(mainConfig.rules).not.toHaveProperty('indent');
        });

        it('should not include quotes rule (Prettier conflict)', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find((c) => c.rules);
            expect(mainConfig.rules).not.toHaveProperty('quotes');
        });

        it('should not include semi rule (Prettier conflict)', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find((c) => c.rules);
            expect(mainConfig.rules).not.toHaveProperty('semi');
        });
    });

    describe('Quality Rules', () => {
        it('should enforce no-var rule', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find((c) => c.rules && c.rules['no-var']);
            expect(mainConfig.rules['no-var']).toBe('error');
        });

        it('should enforce prefer-const rule', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find(
                (c) => c.rules && c.rules['prefer-const']
            );
            expect(mainConfig.rules['prefer-const']).toBe('error');
        });

        it('should have object-shorthand set to never', () => {
            const config = createConfig(js, globals);
            const mainConfig = config.find(
                (c) => c.rules && c.rules['object-shorthand']
            );
            expect(mainConfig.rules['object-shorthand']).toEqual([
                'warn',
                'never'
            ]);
        });
    });
});
