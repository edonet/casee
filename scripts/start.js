/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 17:57:03
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


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    settings = require('../settings'),
    webpack = require('../webpack'),
    server = require('./server');


/**
 *****************************************
 * 启动函数
 *****************************************
 */
async function start() {
    let devSever = server(settings),
        {
            https, host, port, publicPath, contentBase
        } = devSever;


    // 更新配置
    settings.filename = 'js/[name].bundle.js';
    settings.publicPath = `http${ https ? 's' : ''}://${ host }:${ port }/`;

    // 启用服务器
    await webpack(settings, devSever);

    // 打印服务器信息
    console.log(
        '-'.repeat(80),
        `\nProject is running at ${ settings.publicPath }`,
        `\nWebpack output is served from ${ publicPath }`,
        `\nContent for webpack is served from ${ contentBase }`,
        `\n${ '-'.repeat(80) }`
    );
}


/**
 *****************************************
 * 启动
 *****************************************
 */
module.exports = start();
