/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-06 09:38:22
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import throttle from '../../utils/throttle';


/**
 *****************************************
 * 点击事件
 *****************************************
 */
export default function createTapEvent(callback) {
    let status = 'pending',
        touches = new Map(),
        tapabled = true,
        onTouchStart,
        onTouchMove,
        onTouchEnd;


    // 派发事件
    function dispatch(type, event) {
        return callback(type, event, { touches, length: touches.size });
    }

    // 监听触控开始
    onTouchStart = throttle(function handleTouchStart(event) {

        // 获取触控点
        touches = createEventTouches(event, touches);

        // 执行回调
        dispatch('touchStart', event);

        // 更新状态
        status = 'touching';
        tapabled = touches.size < 2;
    });

    // 监听触控移动
    onTouchMove = throttle(function handleTouchMove(event) {
        if (status === 'touching') {

            // 获取触控点
            touches = createEventTouches(event, touches);

            // 执行回调
            dispatch('touch', event);
        }
    });

    // 监听触控移动
    onTouchEnd = throttle(function handleTouchEnd(event) {

        // 执行结束回调
        if (status === 'touching') {
            dispatch('touchEnd', event);
        }

        // 结束触控
        if (touches.size === 1) {

            // 处理【tap】事件
            if (isTapabled(event) && tapabled) {
                let [[, { sx, x, sy, y, st, t }]] = touches,
                    dx = x - sx,
                    dy = y - sy,
                    dt = t - st;

                // 触发【tap】事件
                if (dt < 1000 && dx < 10 && dy < 10) {
                    dispatch('tap', event);
                }
            }

            touches = new Map();
            status = 'pending';
        }
    });

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
function isTapabled(event) {
    let type = event.type,
        isPrevented = event.isDefaultPrevented();

    // 判断是否可触发【tap】
    return (type === 'touchend' || type === 'mouseup') && !isPrevented;
}
