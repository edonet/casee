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
        model = { map: {}, touches: [] },
        tapabled = true;


    // 生成事件
    function createEvent(type, cancelBubble = false) {
        return { type, touches: model.touches, cancelBubble};
    }

    // 监听触控开始
    function onTouchStart(event) {

        // 获取触控点
        model = createEventTouches(event, model.map);

        // 更新状态
        status = 'touching';
        tapabled = model.touches.length < 2;

        // 返回事件
        return createEvent('touchStart');
    }

    // 监听触控移动
    function onTouchMove(event) {
        if (status === 'touching') {

            // 获取触控点
            model = createEventTouches(event, model.map);

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
        if (model.touches.length === 1) {

            // 处理【tap】事件
            if (propagation && !event.isDefaultPrevented() && tapabled) {
                let [{ sx, x, sy, y, st, t }] = model.touches,
                    dx = x - sx,
                    dy = y - sy,
                    dt = t - st;

                // 触发【tap】事件
                if (dt < 1000 && dx < 10 && dy < 10) {
                    syntheticEvent.push(createEvent('tap'));
                }
            }

            model = { map: {}, touches: [] };
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
function createEventTouches(event, map = {}) {
    let model = {
            map: {}, touches: []
        };

    // 获取触控点位
    if (event.touches) {
        [].forEach.call(event.touches, touch => {
            let id = touch.identifier;

            // 生成触控点
            model.map[id] = createEventTouch(id, touch, map[id]);
            model.touches.push(model.map[id]);
        });
    } else {
        let id = 'mouseTouchKey';

        // 生成触控点
        model.map[id] = createEventTouch(id, event, map[id]);
        model.touches.push(model.map[id]);
    }

    // 返回结果
    return model;
}


/**
 *****************************************
 * 创建单个触控点
 *****************************************
 */
function createEventTouch(id, touch, last) {

    // 更新触控点
    if (last) {
        let { sx, sy, st, x: ox, y: oy, t: ot } = last,
            { pageX: x, pageY: y } = touch,
            t = Date.now();

        // 生成触控点
        touch = { id, sx, sy, st, ox, oy, ot, x, y, t };
    } else {
        let { pageX: x, pageY: y } = touch,
            t = Date.now();

        // 生成触控点
        touch = { id, sx: x, sy: y, st: t, ox: x, oy: y, ot: t, x, y, t };
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
