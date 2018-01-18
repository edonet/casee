/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-15 14:39:51
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
import { createAppHistory, resolvePath } from './model';
import * as reducers from './reducers';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppHistory extends Component {

    // 渲染组件
    render() {

        // 渲染元素
        return this.props.children;
    }

    /* 创建历史对象 */
    get history() {
        return {
            ...this.props.$router,
            ...createAppHistory(this.context.$$pathname || '/')
        };
    }
}


/**
 *****************************************
 * 获取路由上下文
 *****************************************
 */
AppHistory.contextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default AppHistory;
export { reducers, resolvePath };


