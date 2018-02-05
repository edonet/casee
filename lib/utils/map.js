/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 09:18:39
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isFunction } from './validate';


/**
 *****************************************
 * 遍历对象
 *****************************************
 */
export default function map(callback) {
    return isFunction(callback) ? data => (
        data && isFunction(data.map, true) ? data.map(callback) : callback(data)
    ) : (data => data);
}
