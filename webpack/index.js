/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-04 11:06:48
 *****************************************
 */
'use strict';


/**
 *************************************
 * 加载依赖
 *************************************
 */
const
    webpack = require('webpack'),
    configure = require('./base.conf');


/**
 *****************************************
 * 抛出打包接口
 *****************************************
 */
module.exports = (app, callback) => {

    // 获取基本配置
    let base = configure(app),
        options;


    // 获取打包配置
    switch (process.env.NODE_ENV) {

        // 开发环境
        case 'development':
            options = require('./dev.conf')(app);
            break;

        // 预发布环境
        case 'beta':
            options = require('./beta.conf')(app);
            break;

        // 正式环境
        default:
            options = require('./dist.conf')(app);
            break;
    }

    // 启动打包
    return webpack(Object.assign({}, base, options), callback);

};
