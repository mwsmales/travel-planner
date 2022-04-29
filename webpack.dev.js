const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }
        ]
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        assetModuleFilename: 'images/[name][ext]',
        clean: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        })],
    devServer: {
        watchFiles: './src'
    }
}