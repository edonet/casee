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
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { initSelector } from 'selector';
import { render as renderElement } from '$$component';
import AppProvider from '../app-provider';
import AppView from '../app-view';
import reducers from '../reducers.js';



/**
 *****************************************
 * 容器组件
 *****************************************
 */
export default class AppContainer extends Component {

    /* 即将挂载组件 */
    componentWillMount() {

        // 创建状态树
        this.$$store = createAppStore(
            combineReducers({ ...reducers, ...this.props.reducers })
        );

        // 初始化选择器
        initSelector(this.$$store);
    }

    /* 更新组件 */
    componentWillReceiveProps(props) {

        // 更新状态树
        this.$$store.replaceReducer(
            combineReducers({ ...reducers, ...props.reducers })
        );
    }

    /* 渲染组件 */
    render() {
        let { children, title, navBar } = this.props,
            props = { title, navBar };

        // 返回元素
        return (
            <AppProvider store={this.$$store}>
                <AppView title="404">404 @:@!</AppView>
                <AppView path="/" { ...props }>{ renderElement({ children })}</AppView>
            </AppProvider>
        );
    }
}


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
function createAppStore(appReducers) {
    let middlewares = [thunk];


    /* 配置开发调试工具 */
    if (process.env.NODE_ENV !== 'production') {

        // 启用【redux】日志
        middlewares.push(require('redux-logger').default);

        // 启用【reducer】纯函数检测
        middlewares.unshift(require('redux-immutable-state-invariant').default());
    }


    /* 创建数据模型 */
    return createStore(appReducers, {}, compose(

        // 装载中间件
        applyMiddleware(...middlewares),

        // 启用【redux】调试扩展，如果可用
        window && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));
}
