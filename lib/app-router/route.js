/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 17:21:59
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { createHistory } from './actions';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRoute extends Component {

    // 渲染组件
    render() {

        // 渲染元素
        return this.props.children;
    }

    /* 创建历史对象 */
    get history() {
        return {
            ...this.props.$router,
            ...createHistory(this.context.$$pathname || '/')
        };
    }
}


/**
 *****************************************
 * 获取路由上下文
 *****************************************
 */
AppRoute.contextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default AppRoute;
