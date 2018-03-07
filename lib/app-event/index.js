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
import createTouchEvent from './lib/TouchEventPlugin';


/**
 *****************************************
 * 事件组件
 *****************************************
 */
export default class AppCapturer extends Component {

    render() {
        let { className, style, children } = this.props,
            props = {
                className, style, ...createTouchEvent(console.log.bind(console, 1))
            };

        // 返回元素
        return (
            <div { ...props }>
                <div { ...createTouchEvent(console.log.bind(console, 2)) }>{ children }</div>
            </div>
        );
    }
}
