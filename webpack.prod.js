const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
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
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        minimizer: [
          new TerserPlugin({}),
          new CssMinimizerPlugin(),
        ],
    }, 
}