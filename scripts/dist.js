/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-13 15:17:49
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 加载依赖
 ****************************************
 */
const
    cp = require('child_process'),
    app = require('../settings'),
    webpack = require('../webpack');



/*
 ****************************************
 * 定义启动函数
 ****************************************
 */
async function start() {

    // 打印输出信息
    console.log('-'.repeat(80));
    console.log(`remove dir "${app.dist}"`);
    console.log('-'.repeat(80));

    // 移除目标路径
    cp.exec(`rm -rf ${app.dist}/*`);


    // 启动【App】打包
    await new Promise((resolve, reject) => {
        webpack(app, (err, compiler) => {

            // 返回错误信息
            if (err) {
                return reject(err);
            }

            // 打印编译信息
            process.stdout.write(compiler.toString(app.stats) + '\n\n');

            // 返回编译结果
            resolve(compiler);
        });
    });

    // 返回启动成功
    return true;
}


/*
 ****************************************
 * 启动项目
 ****************************************
 */
module.exports = start().catch(err => console.error(err));
