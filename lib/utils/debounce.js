/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-01 15:33:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { rAF } from './animate';
import { isFunction } from './validate';


/**
 *****************************************
 * 过滤抖动
 *****************************************
 */
export default function debounce(duration) {
    let pending = true,
        delay = duration > 0 ? cb => setTimeout(cb, duration) : rAF;

    // 返回过滤函数
    return function debounced(callback) {
        if (pending && isFunction(callback)) {
            callback();
            delay(() => pending = true);
            pending = false;
        }
    };
}
