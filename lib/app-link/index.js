/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-10 15:26:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppToucher from '../app-toucher';
import history from '../history';
import { resolve } from '../utils/path';


/**
 *****************************************
 * 链接组件
 *****************************************
 */
export default class AppLink extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 绑定回调
        this.handleTap = this.handleTap.bind(this);
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, onTap: this.handleTap };

        // 返回元素
        return (
            <AppToucher { ...props }>{ children }</AppToucher>
        );
    }

    /* 监听点击事件 */
    handleTap(e, touches) {
        let { onTap, replace, goBack, to, step, method } = this.props,
            { $$pathname: context = '/' } = this.context,
            enabled = !onTap || onTap(e, touches) !== false;

        // 执行回调
        if (enabled && !e.isDefaultPrevented()) {

            // 返回路由
            if (goBack) {
                history.goBack(to ? resolve(context, to) : step, { method });
            } else if (to) {
                replace ?
                history.replace(resolve(context, to), { method }) :
                history.go(resolve(context, to), { method });
            }
        }
    }
}


/**
 *****************************************
 * 获取路由上下文
 *****************************************
 */
AppLink.contextTypes = {
    $$pathname: PropTypes.string
};
