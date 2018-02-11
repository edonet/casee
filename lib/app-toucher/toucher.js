/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-10 14:34:09
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import EventEmitter from '../utils/event';


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
        this.$$status = 'pending';
        this.$$touches = [];

        // 绑定事件回调
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        // 生成事件监听器
        this.$$evnetHandler = {
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouch,
            onTouchEnd: this.handleTouchEnd,
            onTouchCancel: this.handleTouchEnd
        };
    }

    /* 监听触控开始 */
    handleTouchStart(e) {

        // 结束之前的触控
        this.handleTouchEnd(e);

        // 生成点位
        this.$$touches = [].map.call(e.touches || [], touch => {
            let x = touch.pageX,
                y = touch.pageY,
                t = + new Date();

            return { x, y, t, sx: x, sy: y, st: t };
        });

        // 触发开始事件
        this.emit('onTouchStart', e, this.$$touches);

        // 更新状态
        this.$$status = 'touching';
    }

    /* 监听触控事件 */
    handleTouch(e) {

        // 开始触控
        if (this.$$status !== 'touching') {
            return this.handleTouchStart(e);
        }

        // 更新点位
        this.$$touches = this.$$touches.map((touch, idx) => {
            let { x, y, t } = touch,
                { pageX = x, pageY = y } = e.touches[idx] || {};

            // 更新点位
            return {
                ...touch,
                ox: x, oy: y, ot: t,
                x: pageX, y: pageY, t: + new Date()
            };
        });

        // 触发移动事件
        this.emit('onTouchMove', e, this.$$touches);
    }

    /* 监听触控结束 */
    handleTouchEnd(e) {

        // 判断是否已经结束
        if (this.$$status !== 'pending') {

            // 触发移动事件
            this.emit('onTouchEnd', e, this.$$touches);

            // 更新状态
            this.$$status = 'pending';
        }
    }

    /* 获取监听事件 */
    createEvent() {
        return this.$$evnetHandler;
    }
}
