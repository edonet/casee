/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-05 18:12:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 合成事件
 *****************************************
 */
export class SyntheticEvent {

    // 初始化事件
    constructor(type = 'syntheticEvent') {
        this.$$type = type;
        this.$$isDefaultPrevented = false;
        this.$$isPropagationStopped = false;
    }

    // 获取类型
    get type() {
        return this.$$type;
    }

    // 是否阻止了默认事件
    isDefaultPrevented() {
        return this.$$isDefaultPrevented;
    }

    // 是否阻止了冒泡
    isPropagationStopped() {
        return this.$$isPropagationStopped;
    }

    // 阻止默认事件
    preventDefault() {
        return this.$$isDefaultPrevented = true;
    }

    // 阻止冒泡
    stopPropagation() {
        return this.$$isPropagationStopped = true;
    }
}


/**
 *****************************************
 * 创建事件
 *****************************************
 */
export default function createEvent(type, data = {}) {
    let event = new SyntheticEvent(type);

    // 设置事件属性
    Object.keys(data).forEach(
        key => Object.defineProperty(event, key, { get: () => data[key] })
    );

    // 销毁事件
    event.destory = () => data = {};

    // 返回事件接口
    return event;
}
