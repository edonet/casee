/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-10 14:15:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import Toucher from '../utils/toucher';


/**
 *****************************************
 * 触控组件
 *****************************************
 */
export default class AppToucher extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 生成触控对象
        this.$$toucher = new Toucher();

        // 绑定回调
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = {
                className,
                style,
                onTouchStart: this.handleTouchStart,
                onTouchMove: this.handleTouchMove,
                onTouchEnd: this.handleTouchEnd,
                onTouchCancel: this.handleTouchEnd
            };

        // 返回元素
        return (
            <a href="javascript:;" { ...props }>{ children }</a>
        );
    }

    /* 监听触控开始 */
    handleTouchStart(e) {
        this.$$toucher.updateTouches(e);
        this.props.onTouchStart && this.onTouchStart(e, this.$$toucher.$$touches);
    }

    /* 监听触控移动 */
    handleTouchMove(e) {
        this.$$toucher.updateTouches(e);
        this.props.onTouchMove && this.onTouchMove(e, this.$$toucher.$$touches);
    }

    /* 监听触控结束 */
    handleTouchEnd(e) {
        let touches = this.$$toucher.$$touches;

        // 判断是否可点击
        if (this.props.onTap && touches.length === 1) {
            let { x, y, t, sx, sy, st } = touches[0],
                dx = Math.abs(x - sx),
                dy = Math.abs(y - sy),
                dt = t - st;

            // 判断点击
            if (dx < 10 && dy < 10 && dt < 1000) {
                this.props.onTap(e, touches);
            }
        }

        // 触控结束
        this.props.onTouchEnd && this.props.onTouchEnd(e, touches);

        // 更新触控点
        this.$$toucher.updateTouches(e);
    }

    /* 即将卸载组件 */
    componentWillUnmount() {
        this.$$toucher.destroy();
        this.$$toucher = null;
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export { Toucher };
