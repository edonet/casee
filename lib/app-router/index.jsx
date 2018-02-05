/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 17:41:31
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
import history from '../history';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
export default class AppRouter extends Component {

    /* 获取上下文路径 */
    getChildContext() {
        return { history };
    }

    /* 渲染组件 */
    render() {
        return this.props.render();
    }
}


/**
 *****************************************
 * 定义后代上下文类型
 *****************************************
 */
AppRouter.childContextTypes = {
    $$pathname: PropTypes.string
};
