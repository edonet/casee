/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-11 11:24:52
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component, Fragment, createElement } from 'react';


/**
 *****************************************
 * 窗口组件
 *****************************************
 */
export default class AppContainer extends Component {

    /* 渲染容器 */
    render() {
        let { children } = this.props;

        // 获取子元素
        if (typeof children === 'function') {
            children = createElement(children);
        }

        // 返回元素
        return (
            <Fragment>{ children }</Fragment>
        );
    }
}
