/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-06 16:19:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component, Fragment, createElement } from 'react';
import AppView from '../app-view';
import { updateStore } from '../selector';

/**
 *****************************************
 * 窗口组件
 *****************************************
 */
export default class AppContainer extends Component {

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {
        updateStore(props.reducers);
    }

    /* 渲染容器 */
    render() {
        let { children, ...props } = this.props;

        // 获取子元素
        if (typeof children === 'function') {
            children = createElement(children);
        }

        // 返回元素
        return (
            <Fragment>
                <AppView { ...props } path="/">{ children || '' }</AppView>
                <AppView title="404">not find!</AppView>
            </Fragment>
        );
    }
}
