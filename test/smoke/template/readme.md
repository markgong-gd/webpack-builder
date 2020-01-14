利用 webpack 插件打包内联进去，可参考

```sh
npm install --save-dev html-webpack-plugin raw-loader
```
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
        ...
    ]
}
```
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>腾讯直播-直播间</title>
    <script>${ require('raw-loader!../../../node_modules/@tencent/aegis-web-sdk/lib/aegis.min.js') }</script>
    <script>${ require('raw-loader!../../../node_modules/@tencent/aegis-web-sdk/lib/aegisWithAddons.min.js') }</script>
    ...
</head>
<body>
...
</body>
</html>
```