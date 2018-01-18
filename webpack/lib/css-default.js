/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-17 09:57:13
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = selector;


/**
 *****************************************
 * 使用样式列表
 *****************************************
 */
function selector(locals) {
    return function use() {
        var args = [].slice.call(arguments, 0),
            list = [],
            add = function (name) {
                name && list.push(locals[name] || name);
            };

        // 获取列表
        args.forEach(function (arg) {
            var type = typeof arg;

            // 处理字符串
            if (type === 'string') {
                return add(arg);
            }

            // 处理列表
            if (Array.isArray(arg)) {
                return add(use.apply(null, arg));
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
    };
}
