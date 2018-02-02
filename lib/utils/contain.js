/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 19:06:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import each from './each';
import validate from './validate';


/**
 *****************************************
 * 判断是否包含对象
 *****************************************
 */
export default function contain(state, data, keys) {
    let argType = validate(state, 'array', 'object');

    // 判断同一类型
    if (argType && argType === validate(data, 'array', 'object')) {

        // 非同一对象
        if(state !== data) {

            // 处理对象
            if (argType === 'object') {
                return (
                    keys ?
                    each(keys, (idx, key) => key in data && state[key] === data[key]) :
                    each(data, (key, val) => state[key] === val)
                );
            }

            // 判断是否包含数组
            return (
                keys ?
                each(keys, (idx, val) => data.indexOf(val) !== -1 && state.indexOf(val) !== -1) :
                each(data, (idx, val) => state.indexOf(val) !== -1)
            );
        }

        // 同一对象
        return true;
    }

    return false;
}
