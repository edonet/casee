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
import PropTypes from 'prop-types';
import AppToucher from '../app-toucher';
import history from '../history';
import resolve from './resolve';


/**
 *****************************************
 * 链接组件
 *****************************************
 */
export default class AppLink extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 绑定回调函数
        this.handleTap = this.handleTap.bind(this);
    }

    /* 渲染组件 */
    render() {
        return (
            <AppToucher className="app-link" onTap={ this.handleTap }>
                { this.props.children }
            </AppToucher>
        );
    }

    /* 点击跳转回调 */
    handleTap() {
        let {
                path, replace = false, onTap
            } = this.props;


        // 跳转到指定路径
        if (path && (!onTap || onTap() !== false)) {
            path = resolve(this.context.pathname, path);
            replace ? history.replace(path) : history.go(path);
        }
    }
}


/**
 *****************************************
 * 定义上下文类型
 *****************************************
 */
AppLink.contextTypes = {
    pathname: PropTypes.string
};


/**
 *****************************************
 * 路径解析接口
 *****************************************
 */
export { resolve };
