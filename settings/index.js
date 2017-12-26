/**
 *****************************************
 * Created by lifx
 * Created on 2017-09-14 15:20:02
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    path = require('path'),
    initialize = require('./initialize'),
    usedir = dir => (...args) => path.resolve(dir, ...args),
    dir = usedir(path.resolve(__dirname, '../')),
    cwd = usedir(process.cwd()),
    settings = {
        cwd,
        dir,
        rootDir: dir(),
        src: dir('src'),
        dist: dir('dist'),
        entry: dir('src/index.js'),
        index: dir('src/index.html'),
        style: dir('src/style.json'),
        modules: [dir('node_modules')],
        alias: {},
        devServer: {}
    };


/**
 *****************************************
 * 获取自定义配置
 *****************************************
 */
try {
    Object.assign(settings, require(cwd('settings.json')));
} catch (err) {
    // console.error(err);
}


/**
 *****************************************
 * 添加模块路径
 *****************************************
 */
if (dir() !== cwd()) {
    settings.modules.push(cwd('node_modules'));
}


/**
 *****************************************
 * 抛出配置
 *****************************************
 */
module.exports = initialize(settings);
