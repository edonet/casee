/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-06 09:38:22
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 点击事件
 *****************************************
 */
export default {
    type: 'touch', dependencies: createTouchEvent()
};


/**
 *****************************************
 * 创建触控事件
 *****************************************
 */
function createTouchEvent() {
    let status = 'pending',
        touches = new Map(),
        tapabled = true;


    // 生成事件
    function createEvent(type, isPropagationStopped = false) {
        return { type, isPropagationStopped, data: { touches, length: touches.size }};
    }


    // 监听触控开始
    function onTouchStart(event) {

        // 获取触控点
        touches = createEventTouches(event, touches);

        // 更新状态
        status = 'touching';
        tapabled = touches.size < 2;

        // 返回事件
        return createEvent('touchStart');
    }

    // 监听触控移动
    function onTouchMove(event) {
        if (status === 'touching') {

            // 获取触控点
            touches = createEventTouches(event, touches);

            // 执行回调
            return createEvent('touch');
        }
    }

    // 监听触控移动
    function onTouchEnd(event) {
        let syntheticEvent = [],
            propagation = isCanPropagation(event.type);

        // 执行结束回调
        if (status === 'touching') {
            syntheticEvent.push(createEvent('touchEnd', !propagation));
        }

        // 结束触控
        if (touches.size === 1) {

            // 处理【tap】事件
            if (propagation && !event.isDefaultPrevented() && tapabled) {
                let [[, { sx, x, sy, y, st, t }]] = touches,
                    dx = x - sx,
                    dy = y - sy,
                    dt = t - st;

                // 触发【tap】事件
                if (dt < 1000 && dx < 10 && dy < 10) {
                    syntheticEvent.push(createEvent('tap'));
                }
            }

            touches = new Map();
            status = 'pending';
        }

        // 返回合成事件
        return syntheticEvent;
    }

    // 返回插件接口
    return 'ontouchend' in document ? {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTouchCancel: onTouchEnd
    } : {
        onMouseDown: onTouchStart,
        onMouseMove: onTouchMove,
        onMouseUp: onTouchEnd,
        onMouseLeave: onTouchEnd
    };
}


/**
 *****************************************
 * 创建触控点列表
 *****************************************
 */
function createEventTouches(event, map = new Map()) {
    let touches = new Map();

    // 获取触控点位
    if (event.touches) {
        [].forEach.call(event.touches, touch => {
            let id = touch.identifier;
            touches.set(id, createEventTouch(touch, map.get(id)));
        });
    } else {
        let id = 'mouseTouchKey';
        touches.set(id, createEventTouch(event, map.get(id)));
    }

    // 返回结果
    return touches;
}


/**
 *****************************************
 * 创建单个触控点
 *****************************************
 */
function createEventTouch(touch, last) {

    // 更新触控点
    if (last) {
        let { sx, sy, st, x: ox, y: oy, t: ot } = last,
            { pageX: x, pageY: y } = touch,
            t = Date.now();

        // 生成触控点
        touch = { sx, sy, st, ox, oy, ot, x, y, t };
    } else {
        let { pageX: x, pageY: y } = touch,
            t = Date.now();

        // 生成触控点
        touch = { sx: x, sy: y, st: t, ox: x, oy: y, ot: t, x, y, t };
    }

    // 返回触控点
    return touch;
}


/**
 *****************************************
 * 判断是否触发【tap】事件
 *****************************************
 */
function isCanPropagation(eventType) {
    return eventType === 'touchend' || eventType === 'mouseup';
}
