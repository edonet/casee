/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-21 21:46:27
 *****************************************
*/
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import { point, update, offset, scale } from './utils';


/**
 *****************************************
 * 点击组件
 *****************************************
 */
export default class AppToucher extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义属性
        this.$$status = 'pending';
        this.$$touches = [];
        this.$$tapable = true;

        // 绑定回调
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        // 生成事件对象
        this.$$events = {
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
            onTouchCancel: this.handleTouchEnd
        };
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, ...this.$$events };

        // 返回元素
        return (
            <div { ...props }>{ children }</div>
        );
    }

    /* 处理触控开始 */
    handleTouchStart(e) {
        let touches = e.touches;

        // 开始触控
        if (this.$$status === 'pending') {

            // 获取触控点位
            this.$$touches = [].map.call(touches, point);

            // 触发移动/缩放开始事件
            this.trigger(this.$$touches > 1 ? 'onScaleStart' : 'onMoveStart', e);

            // 触发触控开始事件
            this.trigger('onTouchStart', e);

            // 更新状态
            return this.$$status = 'start';
        }

        // 处理移动/缩放
        if (this.$$touches.length > 1 && this.props.onScale) {

            // 更新点位
            this.$$touches = [
                update(this.$$touches[0], touches[0]),
                update(this.$$touches[1], touches[1])
            ];

            // 触发缩放回调
            this.props.onScale(e, this.$$touches, scale(...this.$$touches));

        } else {

            // 更新点位
            this.$$touches = [update(this.$$touches[0], touches[0])];

            // 处理移动
            if (this.props.onMove) {

                // 获取偏移
                this.$$touches = [offset(this.$$touches[0])];

                // 触发移动回调
                this.props.onMove(e, this.$$touches);
            }
        }

        // 触发触控开始事件
        this.trigger('onTouchMove', e);
    }

    /* 处理触控结束 */
    handleTouchEnd(e) {

        // 过滤无效的事件
        if (this.$$status === 'pending') {
            return;
        }

        // 更新状态
        this.$$status = 'pending';

        // 触发触控结束事件
        this.trigger('onTouchEnd', e);

        // 处理多点触控
        if (this.$$touches.length > 1) {

            // 处理缩放
            if (this.props.onScaleEnd) {
                this.trigger('onScaleEnd', e);
            }

            // 无效化点击
            this.$$tapable = false;

        } else {

            // 处理点击
            if (this.$$tapable && this.props.onTap) {
                let { sx, sy, st, x = sx, y = sy, t = st } = this.$$touches[0],
                    tap = t - st < 1000 && Math.abs(x - sx) < 10 && Math.abs(y - sy) < 10;

                // 触发点击事件
                if (tap) {
                    return this.props.onTap(e, this.$$touches);
                }
            }

            // 触发移动结束事件
            this.trigger('onMoveEnd', e);

            // 恢复点击
            this.$$tapable = true;
        }
    }

    /* 触发回调事件 */
    trigger(name, event) {
        this.props[name] && this.props[name](event, this.$$touches);
    }
}
