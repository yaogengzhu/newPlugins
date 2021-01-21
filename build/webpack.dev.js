const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log('执-----行')
module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    entry: path.resolve(config.rootPath, './src/main.js'),
    output: {
        path: path.resolve(config.rootPath, '/dist'),
        publicPath: './',
        filename: './js/main.js'
    },

    module: {
        rules: [{
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },

    devServer: {
        contentBase: false,
        host: 'localhost',
        port: 8080,
        open: true,
        hot: true,
        disableHostCheck: true,
        publicPath: '/',
        // proxy: {
        //     '/api': {
        //         changeOrigin: true,
        //         // target: 'http://test.xxx.me/',
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new webpack.DefinePlugin({
            BASEURL: "''"
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(config.rootPath, './public/index.html')
        })
    ]
})