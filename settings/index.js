/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-04 11:22:11
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义默认配置
 *****************************************
 */
const
    path = require('path'),
    configure = require('./configure'),
    usedir = dir => (...args) => path.resolve(dir, ...args),
    cwd = usedir(process.cwd()),
    dir = usedir(__dirname),
    settings = {
        cwd,
        dir,
        name: 'Sigo',
        keywords: 'Sigo, React, App, UI Framework',
        description: 'Sigo, a react ui framework for App',
        src: dir('../src'),
        dist: cwd('./dist'),
        index: dir('../src/index.html'),
        style: dir('../src/style.json'),
        alias: {}
    };


/**
 *****************************************
 * 合并自定义配置
 *****************************************
 */
try {
    Object.assign(settings, require(cwd('settings.json')));
} catch (err) {
    // console.error(err)
}



/**
 *****************************************
 * 生成配置
 *****************************************
 */
module.exports = configure(settings);
