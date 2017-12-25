/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 22:07:43
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 设置环境变量
 ****************************************
 */
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';


/*
 ****************************************
 * 加载依赖
 ****************************************
 */
const
    cp = require('child_process'),
    settings = require('../settings'),
    webpack = require('../webpack');



/*
 ****************************************
 * 定义启动函数
 ****************************************
 */
async function start() {

    // 打印输出信息
    console.log(
        '-'.repeat(80),
        `\nremove dir "${ settings.dist }"`,
        `\n${ '-'.repeat(80) }`
    );

    // 移除目标路径
    cp.exec(`rm -rf ${settings.dist}/*`);

    // 启动【App】打包
    await webpack(settings);
}


/*
 ****************************************
 * 启动项目
 ****************************************
 */
module.exports = start();
