/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-08 20:59:55
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
 * 滚动组件
 *****************************************
 */
export default class AppScroll extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 监听事件
        this.$$events = bindEvent(this, 'touch');
    }

    /* 渲染组件 */
    render() {
        return (
            <div className="abs box" { ...this.$$events }>
                <div>{ this.props.children }</div>
            </div>
        );
    }

    /* 监听事件 */
    handleEvent(e) {
        switch (e.type) {
            case 'touchstart':
                console.log(e);
                break;
            case 'touch':
                console.log(e);
                break;
            case 'touchend':
                console.log(e);
                break;
            default:
                break;
        }
    }
}
