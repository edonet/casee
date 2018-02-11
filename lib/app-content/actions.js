/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-06 17:54:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import uuid from '../utils/uuid';
import queue from '../utils/queue';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    target: null, views: {}, task: queue()
};

/**
 *****************************************
 * 更新对象
 *****************************************
 */
export default function mount(target) {

    // 执行队列
    target && model.task.invoke(cb => cb(target));

    // 更新对象
    model.target = target;
}


/**
 *****************************************
 * 加载视图
 *****************************************
 */
export function append(el) {
    return (
        model.target ? appendView(el, model.target) : appendTask(el)
    );
}


/**
 *****************************************
 * 添加视图
 *****************************************
 */
function appendView(el, target) {

    // 添加元素
    target.appendChild(el);

    // 返回移除回调
    return () => target && (
        target = el = target.removeChild(el) && null
    );
}


/**
 *****************************************
 * 生成挂载视图任务
 *****************************************
 */
function appendTask(el) {
    let id = uuid(),
        cb = target => model.views[id] = appendView(el, target);

    // 添加任务
    model.task.enqueue(cb);

    // 返回移除回调
    return () => id && (
        id = el = cb = (
            model.views[id] ?
            model.views[id]() || delete model.views[id] :
            model.task.remove(cb)
        ) && null
    );
}
