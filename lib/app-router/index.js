/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-29 23:21:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';
import { reducers, subscribe, initAppHistory } from './history';
import AppRoute from './route';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
export default class AppRouter extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 更新历史记录
        initAppHistory();
    }

    /* 禁止更新 */
    shouldComponentUpdate() {
        return false;
    }

    /* 渲染元素 */
    render() {
        return null;
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export { reducers, subscribe, AppRoute };
export * from './actions';
