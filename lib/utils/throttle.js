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
