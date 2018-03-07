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
import capture, { bindEvent } from './lib/SyntheticEventHub';

/**
 *****************************************
 * 事件组件
 *****************************************
 */
export default class AppCapturer extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        this.$$events = capture(this);
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = {
                className, style, ...this.$$events
            };

        // 返回元素
        return (
            <div { ...props }>
                <div { ...bindEvent({ props: {}, handleEvent: console.log.bind(console) }, 'touch') }>{ children }</div>
            </div>
        );
    }
}
