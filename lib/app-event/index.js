/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-05 18:09:42
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import captureEvent, { bindEvent, inject } from './EventPluginHub';
import TouchEventPlugin from './TouchEventPlugin';


/**
 *****************************************
 * 注册事件
 *****************************************
 */
inject(TouchEventPlugin);


/**
 *****************************************
 * 事件组件
 *****************************************
 */
export default class AppCapturer extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        this.$$events = captureEvent(this);
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = {
                className, style, ...this.$$events
            };

        // 返回元素
        return (
            <div { ...props }>{ children }</div>
        );
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export { bindEvent };
