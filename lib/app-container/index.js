/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 11:16:40
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import { render as renderElement } from '$$component';
import AppRouter from '../app-router';
import AppView from '../app-view';
import store, { updateAppStore } from './store';



/**
 *****************************************
 * 容器组件
 *****************************************
 */
export default class AppContainer extends Component {

    /* 即将挂载组件 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新组件 */
    componentWillReceiveProps(props) {

        // 更新状态创建
        updateAppStore(props.reducers);
    }

    /* 渲染组件 */
    render() {
        let { children, title, navBar } = this.props,
            props = { title, navBar };

        // 返回元素
        return (
            <Provider store={ store }>
                <AppHotContainer>
                    <AppRouter>
                        <AppView title="404">404 @:@!</AppView>
                        <AppView path="/" { ...props }>{ renderElement({ children })}</AppView>
                    </AppRouter>
                </AppHotContainer>
            </Provider>
        );
    }
}

