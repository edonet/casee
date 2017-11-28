/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 15:23:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    babelJest = require('babel-jest'),
    resolve = require.resolve;


/**
 *****************************************
 * 自定义代码转换器
 *****************************************
 */
module.exports = babelJest.createTransformer({
    presets: [
        [
            resolve('babel-preset-env'), { 'modules': false }
        ],
        resolve('babel-preset-react'),
        resolve('babel-preset-react-app'),
        resolve('babel-preset-stage-3')
    ]
});
