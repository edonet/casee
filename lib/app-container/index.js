/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-20 08:52:03
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
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import { initSelector, dispatch } from 'selector';
import AppRouter, { reducers as routerReducers } from '../app-router';
import { AppHistory, reducers as historyReducers, routeConfirmation } from '../history';
import AppHeader from '../app-header';
import AppContent from '../app-content';
import AppView from '../app-view';
import { updateAppInfo } from './actions';
import * as reducers from './reducers';


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
let uiReducers = {
        ...reducers,
        ...historyReducers,
        ...routerReducers
    },
    storeEnhancers = compose(

        // 装载中间件
        applyMiddleware(...middlewares),

        // 启用【redux】调试扩展，如果可用
        window && window.devToolsExtension ? window.devToolsExtension() : f => f,
    );



/**
 *****************************************
 * 定义组件
 *****************************************
 */
export default class AppContainer extends Component {

    /* 即将挂载组件 */
    componentWillMount() {

        // 创建状态树
        this.$$store = createStore(
            combineReducers({ ...uiReducers, ...this.props.reducers }), {}, storeEnhancers
        );

        // 初始化选择器
        initSelector(this.$$store);
    }

    /* 更新组件 */
    componentWillReceiveProps(props) {

        // 更新状态树
        this.$$store.replaceReducer(
            combineReducers({ ...uiReducers, ...props.reducers })
        );
    }

    /* 渲染组件 */
    render() {
        let { children, className = '', style, title, navBar } = this.props,
            { plotform } = this.$$store.getState().$app || {},
            props = { title, navBar };

        // 获取元素
        if (typeof children === 'function') {
            children = React.createElement(children);
        }

        // 生成样式
        className = [plotform, className].reduce(
            (name, curr) => curr ? name + ' ' + curr : name,
            'app-contianer abs box ovhd'
        );

        // 加载组件
        return (
            <Provider store={ this.$$store }>
                <Router
                    forceRefresh={ !('pushState' in window.history) }
                    getUserConfirmation={ routeConfirmation }>
                    <AppHotContainer>
                        <AppRouter className={ className } style={ style }>
                            <AppHistory className={ className } style={ style }>
                                <AppHeader />
                                <AppContent>
                                    <AppView path="/" { ...props }>{children}</AppView>
                                </AppContent>
                            </AppHistory>
                        </AppRouter>
                    </AppHotContainer>
                </Router>
            </Provider>
        );
    }

    /* 挂载组件 */
    componentDidMount() {
        dispatch(updateAppInfo({ ready: true }));
    }
}


/**
 *****************************************
 * 更新状态处理器
 *****************************************
 */
export const updateReducers = (
    reducers => uiReducers = { ...uiReducers, ...reducers }
);

