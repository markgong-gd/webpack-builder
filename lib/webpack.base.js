
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const autoprefixer = require('autoprefixer');

const rootPath = process.cwd();

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(rootPath, './src/*/index.js'));
    Object.keys(entryFiles)
        .forEach((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(rootPath, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    // inlineSource: /aegis.min.js/,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                    },
                }),
            );
        });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(rootPath, 'dist'),
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader', // 配合 .babelrc文件 解析es6、react
                    },
                    // {
                    //     loader: 'eslint-loader'
                    // }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // 解析 css 样式表
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader', // css 属性兼容前缀自动补全
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    Browserslist: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'px2rem-loader', // 配合淘宝 amfe-flexible 实现移动端自动适配
                        options: {
                            remUnit: 75, // 物理尺寸与设计尺寸比值（这里是750px设计稿为例）
                            remPrecision: 8, // 尺寸后预留小数位
                        },
                    },
                    {
                        loader: 'less-loader', // 解析 less
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader', // 解析字体、图片
                        options: {
                            name: '[name]_[hash:8].[ext]', // 图片指纹
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: htmlWebpackPlugins.concat([
        new FriendlyErrorsWebpackPlugin(),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    process.exit(1);
                }
            });
        },
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin()
    ]),
    stats: 'errors-only',
};
