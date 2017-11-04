/**
 *****************************************
 * Created by lifx
 * Created on 2017-10-12 18:21:02
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppProvider, { reducers } from 'ui';


/**
 *************************************
 * 定义【App】中间件
 *************************************
 */
const
    win = window,
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
 *************************************
 * 定义数据仓储
 *************************************
 */
let app = require('app'),
    target = app.target || 'app',
    storeEnhancers = compose(

        // 装载中间件
        applyMiddleware(...middlewares),

        // 启用【redux】调试扩展，如果可用
        win && win.devToolsExtension ? win.devToolsExtension() : f => f,
    ),
    store = createStore(
        combineReducers({ ...app.reducers, ...reducers }), {}, storeEnhancers
    );


/**
 *****************************************
 * 启动应用
 *****************************************
 */

// 获取根节点
if (typeof target === 'string') {
    target = document.getElementById(target);
}

// 创建根节点
if (!target || target.nodeType !== 1) {
    target = document.createElement('div');
    document.body.appendChild(target);
}

// 渲染组件
render((
    <AppProvider store={store}>{app.default}</AppProvider>
), target);


/**
 *****************************************
 * 启用热更新
 *****************************************
 */
if (module.hot) {

    // 接收模块更新
    module.hot.accept(['ui', 'app'], () => {
        let app = require('app');

        // 更新状态树
        store.replaceReducer(
            combineReducers({ ...app.reducers, ...reducers })
        );

        // 渲染组件
        render((
            <AppProvider store={store}>{app.default}</AppProvider>
        ), target);
    });
}
