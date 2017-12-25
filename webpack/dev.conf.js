/**
 *****************************************
 * Created by lifx
 * Created on 2017-08-13 14:40:20
 *****************************************
 */
'use strict';


/**
 *************************************
 * 加载依赖
 *************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    { promisify } = require('util'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OutputWebpackPlugin = require('./lib/output-webpack-plugin'),
    base = require('./base.conf'),
    polyfill = require.resolve('./polyfill');


/**
 *************************************
 * 抛出配置
 *************************************
 */
module.exports = settings => ({
    ...base(settings),
    entry: {
        app: [
            polyfill,
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?' + settings.publicPath,
            'webpack/hot/only-dev-server',
            settings.entry
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(settings.env)
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new ExtractTextPlugin({ disable: true }),
        new HtmlWebpackPlugin({
            template: settings.index,
            filename: path.basename(settings.index),
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new OutputWebpackPlugin({
            data: settings.settings,
            callback: chunk => {

                // 查看目录信息
                fs.stat(settings.dist, async err => {

                    // 获取目标路径
                    let dir = path.resolve(settings.dist, path.basename(settings.index)),
                        data = chunk.html.source();

                    // 创建目录
                    err && await promisify(fs.mkdir)(settings.dist);

                    // 生成文件
                    await promisify(fs.writeFile)(dir, data);
                });
            }
        })
    ]
});
