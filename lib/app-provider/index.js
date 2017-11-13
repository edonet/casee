/**
 *****************************************
 * Created by lifx
 * Created on 2017-10-13 11:49:18
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
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';


/**
 *************************************
 * 定义【App】中间件
 *************************************
 */
const
    middlewares = [thunk];


/**
 *************************************
 * 配置开发调试工具
 *************************************
 */
if (process.env.NODE_ENV !== 'production') {

    /* 启用【react】组件渲染性能检测，不支持@16 */
    // win.Perf = require('react-addons-perf');

    /* 启用【redux】日志 */
    middlewares.push(require('redux-logger').default);

    /* 启用【reducer】纯函数检测 */
    middlewares.unshift(require('redux-immutable-state-invariant').default());
}


/**
 *****************************************
 * 创建中间件行为
 *****************************************
 */
let uiReducers = {},
    storeEnhancers = compose(

        // 装载中间件
        applyMiddleware(...middlewares),

        // 启用【redux】调试扩展，如果可用
        window && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
    routeConfirmation = f => f;



/**
 *****************************************
 * 定义组件
 *****************************************
 */
export default class AppProvider extends Component {

    // 渲染组件
    render() {
        let { reducers, children } = this.props;

        // 创建数据仓储
        if (this.$$store) {

            // 更新状态树
            this.$$store.replaceReducer(
                combineReducers({ ...uiReducers, ...reducers })
            );

        } else {

            // 创建状态树
            this.$$store = createStore(
                combineReducers({ ...uiReducers, ...reducers }), {}, storeEnhancers
            );
        }

        // 获取元素
        if (typeof children === 'function') {
            children = React.createElement(children);
        }

        // 加载组件
        return (
            <Provider store={ this.$$store }>
                <Router
                    forceRefresh={ !('pushState' in window.history) }
                    getUserConfirmation={ routeConfirmation }>
                    <AppContainer>{ children }</AppContainer>
                </Router>
            </Provider>
        );
    }
}


/**
 *****************************************
 * 更新状态处理器
 *****************************************
 */
export const updateReducers = (
    reducers => uiReducers = { ...uiReducers, ... reducers }
);


/**
 *****************************************
 * 更新路由确认回调
 *****************************************
 */
export const updateConfirmation = (
    confirmation => routeConfirmation = confirmation
);
