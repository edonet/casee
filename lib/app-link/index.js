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

        // 获取上下所在路径
        this.$$context = history.pathname;

        // 绑定回调函数
        this.handleTap = this.handleTap.bind(this);
    }

    /* 渲染组件 */
    render() {
        return <div className="app-link">{ this.props.children }</div>;
    }

    /* 点击跳转回调 */
    handleTap() {
        let {
                path, replace = false, onTap
            } = this.props;


        // 跳转到指定路径
        if (path && (!onTap || onTap() !== false)) {
            path = resolve(this.$$context, path);
            replace ? history.replace(path) : history.go(path);
        }
    }
}


/**
 *****************************************
 * 路径解析接口
 *****************************************
 */
export { resolve };
