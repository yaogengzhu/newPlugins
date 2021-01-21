const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    entry: path.resolve(config.rootPath, './src/plugin.js'),
    output: {
        path: path.resolve(config.rootPath, './dist'),
        publicPath: './',
        filename: `js/consulting-plugin.min.js`,
        libraryTarget: 'umd',
        library: "Consulting",
        libraryExport: 'default'
    },

    module: {
        rules: [{
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            
        }),
        new CleanWebpackPlugin()
    ]
})