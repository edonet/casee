/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-20 17:56:24
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';


/**
 *****************************************
 * 点击组件
 *****************************************
 */
export default class AppTap extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 绑定回调
        this.$$events = {
            onTouchStart: this.handleTouchStart.bind(this),
            onTouchEnd: this.handleTouchEnd.bind(this)
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
    handleTouchStart({ touches: [touch] }) {
        this.$$touch = touch ? {
            sx: touch.pageX, sy: touch.pageY, st: + new Date()
        } : null;
    }

    /* 处理触控结束 */
    handleTouchEnd(e) {
        console.log(e.touches, this.$$touch);
        this.$$touch = null;
    }
}
