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
import { bindEvent } from '../app-event';


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
        this.$$events = bindEvent(this, 'touch');
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = {
                className,
                style,
                ...this.$$events
            };

        // 返回元素
        return (
            <a href="javascript:;" { ...props }>{ children }</a>
        );
    }

    /* 监听触控事件 */
    handleEvent(e) {
        if (e.type === 'tap') {
            this.props.onTap && this.props.onTap(e);
        }
    }
}
