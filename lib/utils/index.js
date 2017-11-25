/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-25 13:16:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 组合函数
 *****************************************
 */
export function compose(...args) {
    return data => {
        let len = args;

        while (len --) {
            data = args[len](data);
        }

        return data;
    };
}


/**
 *****************************************
 * 判断是否包含对象
 *****************************************
 */
export function contain(state, data, keys = Object.keys(data)) {

    // 比较数据是否相等
    for (let key of keys) {
        if (data[key] !== state[key]) {
            return false;
        }
    }

    // 返回结果
    return true;
}


/**
 *****************************************
 * 合并对象
 *****************************************
 */
export function assign(...args) {
    return args.reduce((state, data) => ({ ...state, ...data }), {});
}
