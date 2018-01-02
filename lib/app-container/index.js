/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-29 21:16:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载组件
 *****************************************
 */
import React, { Component, Fragment } from 'react';
import { renderComponent } from '$$component';
import { updateAppStore } from '../app-provider';
import AppView from '../app-view';


/**
 *****************************************
 * 容器组件
 *****************************************
 */
export default class AppContainer extends Component {

    /* 即将挂载 */
    componentWillMount() {
        updateAppStore(this.props.reducers);
    }

    /* 更新组件 */
    componentWillReceiveProps(props) {
        updateAppStore(props.reducers);
    }

    /* 渲染组件 */
    render() {
        let { title, navBar, navBack, navLeft, navRight, children } = this.props,
            props = { title, navBar, navBack, navLeft, navRight };

        // 返回元素
        return (
            <Fragment>
                <AppView { ...props } path="/">{ renderComponent({ children }) }</AppView>
                <AppView>404 not find! @:@!</AppView>
            </Fragment>
        );
    }
}
