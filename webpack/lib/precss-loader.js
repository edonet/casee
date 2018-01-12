/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-12 15:54:59
 *****************************************
 */
'use strict';


const code = `
exports.locals = {
    "__esModule": true,
    "default": function use(){
        var args = [].slice.call(arguments, 0),
            list = [];

        // 获取列表
        args.forEach(function (name) {
            if (name && typeof name === 'string') {
                list.push(exports.locals[name] || name);
            }
        });

        // 返回样式
        return list.join(' ');
    },`;


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = function precssLoader(content, ...args) {
    this.async()(null, content.replace('exports.locals = {', code), ...args);
};
