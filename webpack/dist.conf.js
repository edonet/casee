/**
 *****************************************
 * Created by lifx
 * Created on 2017-08-13 14:42:23
 *****************************************
 */
'use strict';


/**
 *************************************
 * 加载依赖
 *************************************
 */
const
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OutputWebpackPlugin = require('./lib/output-webpack-plugin');


/**
 *************************************
 * 抛出配置
 *************************************
 */
module.exports = app => ({
    entry: {
        app: [
            'babel-polyfill',
            app.entry
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(app.env)
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: !app.isProduction
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new ExtractTextPlugin('css/[name]-[contenthash].css'),
        new OutputWebpackPlugin({ data: app.settings }),
        new HtmlWebpackPlugin({
            filename: path.basename(app.index),
            template: app.index,
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
});
