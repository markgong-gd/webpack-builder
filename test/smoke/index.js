const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

process.chdir(path.join(__dirname, 'template'));

const mocha = new Mocha({
    timeout: '10000ms'
})

rimraf('dist', () => {
    const prodConfig = require('../../lib/webpack.prod');

    webpack(prodConfig, (error, stats) => {
        if (error) {
            console.error(error);
            process.exit(2);
        }

        console.log(stats.toString({
            color: true,
            modules: false,
            children: false
        }))

        console.log('webpack build complete, start run test');

        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'js-css-test.js'));

        mocha.run();
    })
})