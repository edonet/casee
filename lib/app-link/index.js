/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 11:34:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import AppTapper from '../app-tapper';
import { withRouter } from '../app-router';


/**
 *****************************************
 * 链接组件
 *****************************************
 */
class AppLink extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 绑定回调
        this.handleTap = this.handleTap.bind(this);
    }

    /* 渲染元素 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, onTap: this.handleTap };

        // 返回元素
        return (
            <AppTapper { ...props }>{ children }</AppTapper>
        );
    }

    /* 处理点击 */
    handleTap() {
        let {
                path, onTap, method, replace, history
            } = this.props;


        // 阻止跳转
        if (onTap && onTap() === false) {
            return false;
        }

        // 跳转路由
        return replace ?
            history.replace(path, { method }) :
            history.go(path, { method });
    }
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withRouter(AppLink);
