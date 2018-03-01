/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 15:50:54
 *****************************************
 */
'use strict';




/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import EventEmitter from './event';
import { updater } from './animate';


/**
 *****************************************
 * 触控对象
 *****************************************
 */
export default class Toucher extends EventEmitter {

    /* 初始化对象 */
    constructor() {
        super();

        // 定义属性
        this.$$map = {};
        this.$$touches = [];
        this.$$update = updater();

        // 绑定事件回调
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    /* 监听触控开始 */
    handleTouchStart(e) {
        this.$$update(() => {
            this.emit('touchStart', e, this.updateTouches(e));
        });
    }

    /* 监听触控事件 */
    handleTouch(e) {
        this.$$update(() => {
            this.emit('touchMove', e, this.updateTouches(e));
        });
    }

    /* 监听触控结束 */
    handleTouchEnd(e) {
        this.$$update(() => {
            this.emit('touchEnd', e, this.$$touches);
            this.updateTouches(e);
        });
    }

    /* 创建触控点 */
    updateTouches(e) {
        let touches = [],
            map = {};

        // 获取触控点
        e.touches && [].forEach.call(e.touches, touch => {
            let id = touch.identifier;

            // 更新触控点
            map[id] = (
                id in this.$$map ? updatePoint(this.$$map[id], touch) : createPoint(touch)
            );

            // 添加触控点
            touches.push(map[id]);
        });

        // 更新触控点
        this.$$touches = touches;
        this.$$map = map;

        // 返回触控点
        return touches;
    }

    /* 绑定对象事件 */
    bindTo(el) {

        // 绑定事件
        el.addEventListener('touchstart', this.handleTouchStart);
        el.addEventListener('touchmove', this.handleTouch);
        el.addEventListener('touchend', this.handleTouchEnd);
        el.addEventListener('touchcancel', this.handleTouchEnd);

        // 返回取消事件回调
        return () => this.unbindTo(el);
    }

    /* 解除事件绑定 */
    unbindTo(el) {
        el.removeEventListener('touchstart', this.handleTouchStart);
        el.removeEventListener('touchmove', this.handleTouch);
        el.removeEventListener('touchend', this.handleTouchEnd);
        el.removeEventListener('touchcancel', this.handleTouchEnd);
    }

    /* 销毁对象 */
    destroy() {
        this.$$map = null;
        this.$$touches = null;
        this.$$update = null;
        this.off();
    }
}


/**
 *****************************************
 * 创建触控点
 *****************************************
 */
function createPoint(touch) {
    let x = touch.pageX,
        y = touch.pageY,
        t = + new Date();

    // 返回点
    return {
        id: touch.identifier,
        x, y, t,
        ox: x, oy: y, ot: t,
        sx: x, sy: y, st: t
    };
}


/**
 *****************************************
 * 更新触控点
 *****************************************
 */
function updatePoint(point, { pageX: x, pageY: y }) {
    let { x: ox, y: oy, t: ot } = point,
        t = + new Date();

    // 返回点
    return t - ot > 10 ? {
        ...point, ox, oy, ot, x, y, t
    } : point;
}
