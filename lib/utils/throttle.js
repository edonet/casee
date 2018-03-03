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
import { rAF, cAF } from './animate';


/**
 *****************************************
 * 节流
 *****************************************
 */
export default function throttle(callback, duration = 0, { leading = true } = {}) {
    if (isFunction(callback)) {
        if (leading) {
            return duration ? leadingTimeThrottle(callback, duration) : leadingAFThrottle(callback);
        } else {
            return duration ? trailingTimeThrottle(callback, duration) : trailingAFThrottle(callback);
        }
    }
}


/**
 *****************************************
 * 前置帧节流
 *****************************************
 */
function leadingAFThrottle(callback) {
    let timeId = null,
        result;

    // 取消节流
    function cancel() {
        timeId && cAF(timeId);
        timeId = null;
    }

    // 生成节流函数
    function throttled(...args) {

        // 生成新的节流监听
        if (timeId === null) {
            timeId = rAF(() => timeId = null);
            result = callback.apply(this, args);
        }

        // 返回结果
        return result;
    }

    // 设置取消接口
    throttled.cancel = cancel;

    // 返回节流函数
    return throttled;
}


/**
 *****************************************
 * 前置时间节流
 *****************************************
 */
function leadingTimeThrottle(callback, duration) {
    let lastCall = 0,
        result;

    // 取消节流
    function cancel() {
        lastCall = 0;
    }

    // 生成节流函数
    function throttled(...args) {
        let now = + new Date();

        // 生成新的节流监听
        if (lastCall === 0 || now - lastCall >= duration) {
            lastCall = now;
            result = callback.apply(this, args);
        }

        // 返回结果
        return result;
    }

    // 设置取消接口
    throttled.cancel = cancel;

    // 返回节流函数
    return throttled;
}


/**
 *****************************************
 * 延时帧节流
 *****************************************
 */
function trailingAFThrottle(callback) {
    let timeId = null,
        lastContext = null,
        lastArgs = [],
        result;

    // 取消节流
    function cancel() {
        timeId && cAF(timeId);
        timeId = null;
    }

    // 执行回调
    function invokeCallback() {
        result = callback.apply(lastContext, lastArgs);
        timeId = null;
    }

    // 生成节流函数
    function throttled(...args) {

        // 生成新的节流监听
        if (timeId === null) {
            timeId = rAF(invokeCallback);
        }

        // 更新参数
        lastContext = this;
        lastArgs = args;

        // 返回结果
        return result;
    }

    // 设置取消接口
    throttled.cancel = cancel;

    // 返回节流函数
    return throttled;
}


/**
 *****************************************
 * 延时帧节流
 *****************************************
 */
function trailingTimeThrottle(callback, duration) {
    let timeId = null,
        lastContext = null,
        lastArgs = [],
        result;

    // 取消节流
    function cancel() {
        timeId && clearTimeout(timeId);
        timeId = null;
    }

    // 执行回调
    function invokeCallback() {
        result = callback.apply(lastContext, lastArgs);
        timeId = null;
    }

    // 生成节流函数
    function throttled(...args) {

        // 生成新的节流监听
        if (timeId === null) {
            timeId = setTimeout(invokeCallback, duration);
        }

        // 更新参数
        lastContext = this;
        lastArgs = args;

        // 返回结果
        return result;
    }

    // 设置取消接口
    throttled.cancel = cancel;

    // 返回节流函数
    return throttled;
}
