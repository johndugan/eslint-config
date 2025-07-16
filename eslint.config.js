import johnduganConfig from './configs/index.js';

const config = [
    ...johnduganConfig,
    {
        ignores: ['node_modules/', 'dist/', 'build/']
    }
];

export default config;
