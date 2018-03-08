/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-05 18:12:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建事件
 *****************************************
 */
export default function createSyntheticEvent(data) {
    return createEvent({
        type: 'synthetic',
        defaultPrevented: false,
        cancelBubble: false,
        ...data
    });
}


/**
 *****************************************
 * 创建合成事件
 *****************************************
 */
function createEvent(data) {
    let event = Object.create({
            isDefaultPrevented() { return data.defaultPrevented; },
            isPropagationStopped() { return data.cancelBubble; },
            preventDefault() { return data.defaultPrevented = true; },
            stopPropagation() { return data.cancelBubble = true; }
        });


    // 设置事件属性
    Object.keys(data).forEach(
        key => Object.defineProperty(event, key, { get: () => data[key] })
    );

    // 返回事件
    return event;
}
