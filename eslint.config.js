import johnduganConfig from './configs/index.js';

export default [
    ...johnduganConfig,
    {
        ignores: ['node_modules/', 'dist/', 'build/']
    }
];
