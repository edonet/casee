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
            list = [],
            add = function(name) {
                name && list.push(name);
            };

        // 获取列表
        args.forEach(function (arg) {
            var type = typeof arg;

            // 处理字符串
            if (type === 'string') {
                return add(exports.locals[arg] || arg);
            }

            // 处理列表
            if (Array.isArray(arg)) {
                return add(use(...arg));
            }

            // 处理对象
            if (type === 'object') {
                return list = list.concat(Object.keys(name).filter(key => !!name[key]));
            }

            // 处理函数
            if (type === 'function') {
                return add(use(name()));
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
