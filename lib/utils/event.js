/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-08 15:36:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isString, isFunction } from './validate';


/**
 *****************************************
 * 事件收发器
 *****************************************
 */
export default class EventEmitter {

    /* 初始化对象 */
    constructor() {
        this.$$events = {};
    }

    /* 添加事件监听 */
    on(name, handler) {

        // 添加事件
        if (isString(name) && isFunction(handler)) {
            appendEvent(this.$$events, { name, handler, limit: 0 });
        }

        // 返回对象
        return this;
    }

    /* 添加单次事件监听 */
    once(name, handler) {

        // 添加事件
        if (isString(name) && isFunction(handler)) {
            appendEvent(this.$$events, { name, handler, limit: 1 });
        }

        // 返回对象
        return this;
    }

    /* 移除事件 */
    off(name, handler) {

        // 移除事件
        if (isString(name, true)) {
            if (isFunction(handler, true)) {
                removeEvent(this.$$events, { name, handler });
            } else if (name in this.$$events) {
                delete this.$$events[name];
            }
        } else {
            this.$$events = {};
        }

        // 返回对象
        return this;
    }

    /* 执行事件回调 */
    emit(name, ...args) {

        // 执行回调
        if (isString(name) && name in this.$$events) {
            this.$$events[name] = emitEvent(this.$$events[name], args);
        }

        // 执行事件回调
        if ('$emit' in this.$$events) {

            // 更新参数
            args.unshift(name);

            // 执行回调
            this.$$events.$emit = emitEvent(this.$$events.$emit, args);
        }

        // 返回对象
        return this;
    }
}


/**
 *****************************************
 * 添加事件
 *****************************************
 */
function appendEvent(events, { name, handler, limit = 0 }) {
    if (name in events) {
        events[name].push({ handler, limit, count: 0 });
    } else {
        events[name] = [{ handler, limit, count: 0 }];
    }
}


/**
 *****************************************
 * 移除事件
 *****************************************
 */
function removeEvent(events, { name, handler }) {
    if (name in events) {
        events[name] = events[name].filter(e => e.handler !== handler);
    }
}


/**
 *****************************************
 * 执行事件
 *****************************************
 */
function emitEvent(eventList, args) {
    return eventList.filter(e => {

        // 执行回调
        e.handler.apply(null, args);

        // 返回是否超出执行次数
        return !e.limit || e.limit > ++e.count;
    });
}
