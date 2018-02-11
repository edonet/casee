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
import Toucher from './toucher';


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

        // 监听触控事件
        this.handleToucher();
    }

    /* 监听触控事件 */
    handleToucher() {

        // 监听触控开始
        this.$$toucher.on('onTouchStart', (e, touches) => {
            this.props.onTouchStart && this.onTouchStart(e, touches);
        });

        // 监听触控移动
        this.$$toucher.on('onTouchMove', (e, touches) => {
            this.props.onTouchMove && this.onTouchMove(e, touches);
        });

        // 监听触控结束
        this.$$toucher.on('onTouchEnd', (e, touches) => {

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
        });
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, ...this.$$toucher.createEvent() };

        // 返回元素
        return (
            <a href="javascript:;" { ...props }>{ children }</a>
        );
    }
}
