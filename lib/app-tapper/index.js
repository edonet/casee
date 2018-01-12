/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 16:25:31
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
import tapper from './tapper';


/**
 *****************************************
 * 点击组件
 *****************************************
 */
export default class AppTapper extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 生成点击事件
        this.$$events = tapper((e, touches) => {
            this.props.onTap && this.props.onTap(e, touches);
        }).createEvents();
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, ...this.$$events };

        return (
            <a href="javascript:;" { ...props }>{ children }</a>
        );
    }
}
