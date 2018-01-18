/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-12 15:54:59
 *****************************************
 */
'use strict';


const
    path = require('path'),
    cssDefault = path.resolve(__dirname, './css-default.js'),
    code = `

// es6 module
exports.locals["__esModule"] = true;
exports.locals["default"] = require('${ cssDefault }')(exports.locals);
`;


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = function precssLoader(content, ...args) {
    this.async()(null, content + code, ...args);
};
