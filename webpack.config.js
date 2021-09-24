const path = require('path');
const webpack = require('webpack');
const jsonData = require('./data.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: path.join(__dirname, "js", "app.js"),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9001,
        onAfterSetupMiddleware: function(devServer) {
            devServer.app.get('/chart-data', function(req, res) {
                res.setHeader('Content-Type', 'application/json')
                res.json(jsonData)
            })
        }
    },

    module: {
        rules: [
            {
                test: /\.m?js|.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "template.html"),
            filename: path.resolve(`${__dirname}/dist/index.html`)
        })
    ],
};