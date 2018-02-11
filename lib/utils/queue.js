/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 10:43:16
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
 * 创建队列
 *****************************************
 */
export default function queue() {
    let task = [];

    // 执行队列
    function invoke(cb) {
        if (isFunction(cb, true)) {
            let len = task.length;

            while (len --) {
                if (cb(task.shift()) === false) {
                    return false;
                }
            }

            // 执行完成
            return true;
        }
    }

    // 返回接口
    return {
        invoke,
        enqueue: (...args) => task.push(...args),
        dequeue: () => task.shift(),
        first: () => task[0] || null,
        last: () => task[task.length - 1] || null,
        find: data => task.indexOf(data),
        remove: data => { task = task.filter(item => item !== data); },
        clear: () => { task = []; },
        isEmpty: () => task.length === 0,
        get length() {
            return task.length;
        }
    };
}
