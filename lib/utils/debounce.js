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
import { rAF, cAF } from './animate';
import { isFunction } from './validate';


/**
 *****************************************
 * 过滤抖动
 *****************************************
 */
export default function debounce(callback, duration = 0, { leading = false } = {}) {
    let timeId = null,
        lastContext = null,
        lastArgs = null,
        invokeCallback = () => {
            callback.apply(lastContext, lastArgs);
            timeId = lastContext = lastArgs = null;
        },
        startTimer,
        clearTimer;


    // 校验参数
    if (!isFunction(callback)) {
        return null;
    }

    // 延时时间
    if (duration) {

        // 开始计时器
        startTimer = () => {
            timeId && clearTimeout(timeId);
            timeId = setTimeout(invokeCallback, duration);
        };

        // 取消计时器
        clearTimer = () => {
            timeId && clearTimeout(timeId);
            timeId = null;
        };
    } else {

        // 开始计时器
        startTimer = () => {
            timeId && cAF(timeId);
            timeId = rAF(invokeCallback);
        };

        // 取消计时器
        clearTimer = () => {
            timeId && cAF(timeId);
            timeId = null;
        };
    }

    // 生成去抖动函数
    function debounced(...args) {

        // 更新参数
        if (!timeId || !leading) {
            lastArgs = args;
            lastContext = this;
        }

        // 启动计时器
        startTimer();
    }

    // 定义取消方法
    debounced.cancel = clearTimer;

    // 返回去抖动函数
    return debounced;
}
