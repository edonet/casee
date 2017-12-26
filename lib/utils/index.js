/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 23:38:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * uuid
 *****************************************
 */
export const uuid = (id => () => id ++)(+ new Date());


/**
 *****************************************
 * 合并对象
 *****************************************
 */
export function assign(...args) {
    return args.reduce((state, data) => ({ ...state, ...data }), {});
}


/**
 *****************************************
 * 判断是否包含对象
 *****************************************
 */
export function contain(state, data, keys = Object.keys(data)) {

    // 比较数据是否相等
    return each(data, (key, value) => (state[key] === value), keys);
}


/**
 *****************************************
 * 遍历对象
 *****************************************
 */
export function each(data, callback, keys = Object.keys(data)) {

    // 遍历健表
    for (let key of keys) {
        if (callback(key, data[key]) === false) {
            return false;
        }
    }

    // 返回结果
    return true;
}


/**
 *****************************************
 * 组合函数
 *****************************************
 */
export function compose(...tasks) {
    return (...args) => (
        tasks.reduceRight((arr, func) => [func(...arr)], ...args)[0]
    );
}
