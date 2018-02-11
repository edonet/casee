/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-08 10:02:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { isFunction } from './validate';
import { rAF } from './animate';


/**
 *****************************************
 * 节流
 *****************************************
 */
export default function throttle(duration, leading = false) {
    let callback = null,
        update = () => callback = callback() && null,
        request = (
            duration && typeof duration === 'number' ?
            () => setTimeout(update, duration) :
            () => rAF(update)
        );

    // 返回更新回调
    return function invoke(handler) {
        if (isFunction(handler)) {
            if (callback) {
                leading || (callback = handler);
            } else {
                callback = handler;
                request();
            }
        }
    };
}
