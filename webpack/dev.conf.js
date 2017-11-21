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
    cp = require('child_process'),
    sh = require('shelljs'),
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
            'react-hot-loader/patch',
            'webpack-dev-server/client?' + app.publicPath,
            'webpack/hot/only-dev-server',
            app.entry
        ]
    },
    devtool: 'inline-source-map',
    devServer: app.devServer,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(app.env)
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
            template: app.index,
            filename: path.basename(app.index),
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new OutputWebpackPlugin({
            data: app.settings,
            callback: chunk => {

                try {

                    // 移除文件夹
                    sh.rm('-rf', app.dist);
    
                    // 创建文件夹
                    sh.mkdir(app.dist);
                    // cp.exec(`mkdir ${app.dist}`);
    
                    // 获取目标路径
                    let dir = path.resolve(app.dist, path.basename(app.index)),
                        data = chunk.html.source();
    
                    // 生成文件
                    fs.writeFile(dir, data, err => err && console.error(err));
                } catch (err) {
                    console.log(err);
                }
            }
        })
    ]
});
