/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 19:04:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');


/**
 *****************************************
 * 打包应用
 *****************************************
 */
module.exports = (settings, devServer) => (
    devServer ? createServer(settings, devServer) : createPack(settings)
);


/**
 *****************************************
 * 启动打包服务器
 *****************************************
 */
function createServer(settings, devServer) {
    return new Promise((resolve, reject) => {
        let { port, host } = devServer,
            app = require('./dev.conf')(settings),
            server = new WebpackDevServer(webpack(app), devServer);


        // 启动服务器监听
        server.listen(port, host, err => {

            // 输出错误信息
            if (err) {
                return reject(err);
            }

            resolve(server);
        });
    });
}


/**
 *****************************************
 * 启动打包
 *****************************************
 */
function createPack(settings) {
    return new Promise((resolve, reject) => {
        let app = require('./dist.conf')(settings);

        // 启动打包
        webpack(app, (err, compiler) => {

            // 返回错误信息
            if (err) {
                return reject(err);
            }

            // 打印编译信息
            process.stdout.write(compiler.toString(settings.stats) + '\n\n');

            // 返回编译结果
            resolve(compiler);
        });
    });
}
