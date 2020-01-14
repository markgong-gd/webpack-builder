const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    output: {
        filename: '[name].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    devtool: 'source-map',
    stats: 'errors-only',
};

module.exports = merge(baseConfig, devConfig);
