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
export default function throttle(callback, duration = 0, { leading = false } = {}) {
    let model = {},
        invokeCallback = () => {
            leading || callback.apply(model.context, model.args);
            model.timeId = model.context = model.args = null;
        };


    // 校验参数
    if (!isFunction(callback)) {
        return null;
    }

    // 处理延时
    if (duration) {

        // 启动计时器
        model.startTimer = () => {
            model.timeId = setTimeout(invokeCallback, duration);
        };

        // 取消计时器
        model.clearTimer = () => {
            model.timeId && clearTimeout(model.timeId);
            model.timeId = null;
        };
    } else {

        // 启动计时器
        model.startTimer = () => {
            model.timeId = rAF(invokeCallback);
        };

        // 取消计时器
        model.clearTimer = () => {
            model.timeId && cAF(model.timeId);
            model.timeId = null;
        };
    }

    // 定义节流函数
    function throttled(...args) {
        if (model.timeId) {
            if (!leading) {
                model.context = this;
                model.args = args;
            }
        } else {
            leading && callback.apply(this, args);
            model.startTimer();
        }
    }

    // 取消节流函数
    throttled.cancel = model.clearTimer;

    // 返回节流函数
    return throttled;
}


function throttle2(callback, duration = 0, { leading = false } = {}) {

}


function leadingThrottle(callback, duration = 0) {
    let lastCall = 0,
        cancel = () => lastCall = 0,
        start,
        update,
        result;


    // 执行回调
    function invokeCallback(context, args, timeStamp) {
        lastCall = timeStamp;
        return result = callback.apply(context, args);
    }

    if (duration) {
        start = invokeCallback;
        update = (context, args, timeStamp) => {

            // 超时时执行回调
            if (timeStamp - lastCall >= duration) {
                return invokeCallback(context, args, timeStamp);
            }

            // 返回源结果
            return result;
        };
    } else {
        start = (context, args, timeStamp) => {
            rAF(cancel);
            return invokeCallback(context, args, timeStamp);
        };

        update = () => result;
    }


    // 定义节流函数
    function throttled(...args) {

        // 过滤回调
        if (lastCall) {
            return update(this, args, + new Date());
        }

        // 执行回调
        return start(this, args, + new Date());
    }

    // 取消节流
    throttled.cancel = cancel;

    // 返回节流函数
    return throttled;
}


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
