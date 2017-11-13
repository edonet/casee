/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-13 15:14:23
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 设置环境变量
 ****************************************
 */
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';


/*
 ****************************************
 * 加载依赖
 ****************************************
 */
const
    app = require('../settings'),
    webpack = require('../webpack'),
    WebpackDevServer = require('webpack-dev-server');


/*
 ****************************************
 * 定义启动函数
 ****************************************
 */
async function start() {

    // 启动开发服务器
    await new Promise((resolve, reject) => {

        let { publicPath: url, devServer } = app,
            { host, port, publicPath, contentBase } = devServer,
            server = new WebpackDevServer(webpack(app), devServer);


        // 启动服务器监听
        server.listen(port, host, err => {

            // 输出错误信息
            if (err) {
                return reject(err);
            }

            // 打印服务器信息
            console.log(
                '-'.repeat(80),
                `\nProject is running at ${ url }`,
                `\nWebpack output is served from ${ publicPath }`,
                `\nContent for webpack is served from ${ contentBase }`,
                `\n${'-'.repeat(80)}`
            );
        });
    });
}


/*
 ****************************************
 * 启动项目
 ****************************************
 */
module.exports = start().catch(err => console.error(err));
