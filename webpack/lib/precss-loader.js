/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-12 15:54:59
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 生成样式默认加载接口代码
 *****************************************
 */
const code = (() => {
    let os = require('os'),
        path = require('path'),
        cssDefault = path.resolve(__dirname, './css-default.js');

    // 【window】下替换路径中的反斜杠
    if (os.platform() === 'win32') {
        cssDefault = cssDefault.replace(/\\/g, '/');
    }

    // 返回结果代码
    return (
        '\n\n' +
        '// es6 module\n' +
        'exports.locals["__esModule"] = true;\n' +
        'exports.locals["default"] = require("' + cssDefault + '")(exports.locals);\n'
    );
})();


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = function precssLoader(content, ...args) {
    this.async()(null, content + code, ...args);
};
