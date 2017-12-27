/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 17:06:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isString, isFunction } from '../validete';


/**
 *****************************************
 * 定义事件监听器
 *****************************************
 */
export default class EventEmitter {

    /* 初始化 */
    constructor() {
        this.$$events = {};
    }

    /* 添加事件 */
    on(name, handler) {

        // 校验参数
        if (isString(name) && isFunction(handler)) {

            // 添加事件
            if (name in this.$$events) {
                this.$$events[name].push(handler);
            } else {
                this.$$events[name] = [handler];
            }
        }

        // 返回对象
        return this;
    }

    /* 移除事件 */
    off(...args) {
        let len = args.length;

        // 移除指定事件监听
        if (len > 1) {
            let [name, handler] = args;

            // 检验参数
            if (isString(name) && isFunction(handler)) {
                let list = this.$$events[name],
                    idx = list ? list.indexOf(handler) : - 1;

                // 移除事件
                idx > -1 && list.splice(idx, 1);
            }

        } else if (len) {

            // 检验参数
            if (isString(name) && this.$$events[name]) {
                delete this.$$events[name];
            }
        } else {

            // 移除所有事件监听
            this.$$events = {};
        }

        // 返回对象
        return this;
    }

    /* 触发事件 */
    emit(name, ...args) {

        // 触发事件
        if (isString(name) && this.$$events[name]) {
            this.$$events[name].forEach(handler => handler(...args));
        }

        // 返回对象
        return this;
    }
}
