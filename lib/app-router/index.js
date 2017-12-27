/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 11:36:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history, { reducers, updateAppHistory } from './history';
import withRouter from './route';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRouter extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 更新历史记录
        updateAppHistory(history.location);
    }

    /* 获取上下文路径 */
    getChildContext() {
        return { $$pathname: '/' };
    }

    /* 渲染组件 */
    render() {
        return (
            <div className={ this.props.className }>
                { this.props.children }
            </div>
        );
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



/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default AppRouter;
export { reducers, withRouter };
