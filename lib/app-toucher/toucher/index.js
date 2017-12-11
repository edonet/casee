/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-11 17:52:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { compose } from '$$utils';
import { point, update, offset, scale } from './utils';


/**
 *****************************************
 * 触控监听
 *****************************************
 */
export default function toucher(target) {
    let model = {
            status: 'pending',
            touches: [],
            tapable: true
        },
        emit = (name, ...args) => {
            model.target[name] && model.target[name](...args);
        },
        onTouchStart = handleTouchStart(model, emit),
        onTouchEnd = handleTouchEnd(model, emit);


    // 更新数据
    updateToucher(model, target);

    // 生成触控回调
    model.invoke = invokeToucher(model, emit);

    // 返回触控对象
    return {
        update: target => updateToucher(model, target),
        events: {
            onTouchStart,
            onTouchMove: onTouchStart,
            onTouchEnd,
            onTouchCancel: onTouchEnd
        }
    };
}



/**
 *****************************************
 * 更新手势
 *****************************************
 */
function updateToucher(model, target = {}) {

    // 处理更新
    if (target.onScale) {

        // 生成缩放手势
        model.probe = 3;
        model.updater = compose(offset, update);

    } else if (target.onMove) {

        // 生成移动手势
        model.probe = 2;
        model.updater = compose(offset, update);

    } else {

        // 生成点击手势
        model.probe = 1;
        model.updater = update;
    }

    // 绑定对象
    model.target = target;
}



/**
 *****************************************
 * 处理触控开始
 *****************************************
 */
function handleTouchStart(model, emit) {
    return function onTouchStart(event) {
        let touches = event.touches;

        // 开始触控
        if (model.status === 'pending') {

            // 获取触控点位
            model.touches = [].map.call(touches, point);

            // 触发触控开始事件
            emit('onTouchStart', event, touches);

            // 更新状态
            model.status = 'start';

            // 返回操作类型
            return model.invoke('start');
        }

        // 更新点位
        model.touches = [].map.call(
            touches, (touch, idx) => model.updater(model.touches[idx], touch)
        );

        // 触发触控开始事件
        emit('onTouchMove', event, touches);

        // 返回操作类型
        return model.invoke('moving');
    };
}


/**
 *****************************************
 * 处理触控开始
 *****************************************
 */
function handleTouchEnd(model, emit) {
    return function onTouchEnd(event) {

        // 过滤无效的事件
        if (model.status === 'pending') {
            return;
        }

        // 更新状态
        model.status = 'pending';

        // 触发触控结束事件
        emit('onTouchEnd', event, model.touches);

        // 处理点击
        if (model.touches.length < 2 && model.tapable) {
            let { sx, sy, st, x = sx, y = sy, t = st } = model.touches[0],
                tap = t - st < 1000 && Math.abs(x - sx) < 10 && Math.abs(y - sy) < 10;

            // 触发点击事件
            if (tap) {
                emit('onTap', event, model.touches);

                // 返回操作类型
                return model.invoke('tap');
            }
        }

        // 设置是否可点击
        model.tapable = model.touches.length > 1;

        // 返回操作类型
        return model.invoke('end');
    };
}


/**
 *****************************************
 * 执行触控回调
 *****************************************
 */
function invokeToucher(model, emit) {
    return function invoke(action, event) {
        let touches = model.touches,
            trigger = (name, ...args) => emit(name, event, touches, ...args);

        // 处理行为
        switch (model.probe) {
            case 1:
                break;
            case 2:
                invokeMoveAction({ action, touches, trigger });
                break;
            default:
                invokeScaleAction({ action, touches, trigger });
                break;
        }
    };
}


/**
 *****************************************
 * 执行移动行为
 *****************************************
 */
function invokeMoveAction({ action, trigger }) {
    switch (action) {
        case 'moving': trigger('onMove'); break;
        case 'start': trigger('onMoveStart'); break;
        case 'end': trigger('onMoveEnd'); break;
        default: break;
    }
}


/**
 *****************************************
 * 执行缩放行为
 *****************************************
 */
function invokeScaleAction({ action, touches, trigger }) {
    switch (action) {
        case 'moving':
            touches.length > 1 ? trigger('onScale', scale(...touches)) : trigger('onMove');
            break;
        case 'start':
            trigger(touches.length > 1 ? 'onScaleStart' : 'onMoveStart');
            break;
        case 'end':
            trigger(touches.length > 1 ? 'onScaleEnd' : 'onMoveEnd');
            break;
        default:
            break;
    }
}
