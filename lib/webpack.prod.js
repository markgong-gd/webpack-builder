const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
    output: {
        filename: '[name]_[chunkhash:8].js',
    },
    mode: 'production',
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(), // 优化：减少打包闭包作用域，达到减小打包体积
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        new HtmlWebPackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.staticfile.org/react/16.10.2/umd/react.development.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.staticfile.org/react-dom/16.10.2/umd/react-dom.development.js',
                    global: 'ReactDOM',
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                common: {
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
};

module.exports = merge(baseConfig, prodConfig);
