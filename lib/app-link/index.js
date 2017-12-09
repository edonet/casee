/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-20 17:39:50
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import AppToucher from '../app-toucher';
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

        // 绑定回调函数
        this.handleTap = this.handleTap.bind(this);
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = {
                component: 'a', className, style,
                href: 'javascritp:;', onTap: this.handleTap
            };


        return (
            <AppToucher { ...props }> { children }</AppToucher>
        );
    }

    /* 点击跳转回调 */
    handleTap(e) {
        let {
                path, replace = false, onTap, history
            } = this.props;


        // 跳转到指定路径
        if ((!onTap || onTap(e, history) !== false) && path) {
            replace ? history.replace(path) : history.go(path);
        }
    }
}


/**
 *****************************************
 * 绑定路由
 *****************************************
 */
export default withRouter(AppLink);
