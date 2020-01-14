const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const ssrConfig = {
    output: {
        filename: '[name]-server.js',
        libraryTarget: 'umd',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'ignore-loader',
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'ignore-loader',
                    },
                ],
            },
        ],
    },
};

module.exports = merge(baseConfig, ssrConfig);
