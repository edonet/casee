/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 15:23:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 遍历对象
 *****************************************
 */
export default function each(object, callback, keys) {
    if (object && typeof object === 'object' && typeof callback === 'function') {

        // 处理数组
        if (Array.isArray(object)) {
            let len = object.length,
                idx = typeof keys === 'number' && keys > -1 ? keys : 0;

            // 遍历数组
            for(; idx < len; idx ++) {
                if (callback(idx, object[idx]) === false) {
                    return false;
                }
            }

            // 遍历完成
            return true;
        }

        // 处理对象
        return each(
            Array.isArray(keys) ? keys : Object.keys(object),
            (idx, key) => callback(key, object[key])
        );
    }
}
