/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 20:40:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { dispatch } from 'selector';
import history, { updateAppHistory, updateHistory } from './actions';
import * as reducers from './reducers';


/**
 *****************************************
 * 历史记录组件
 *****************************************
 */
class AppRouter extends Component {

    /* 即将挂载组件 */
    componentWillMount() {

        // 初始化数据
        this.componentWillReceiveProps(this.props);
    }

    /* 定义接收属性接口 */
    componentWillReceiveProps(props) {

        // 更新历史记录
        updateHistory(props) && dispatch(updateAppHistory({
            action: history.action,
            method: history.method,
            pathname: history.pathname,
            histories: history.histories
        }));
    }

    /* 渲染空元素 */
    render() {
        return (
            <div className={ this.props.className } style={ this.props.style }>
                { this.props.children }
            </div>
        );
    }
}


/**
 *****************************************
 * 创建路由组件
 *****************************************
 */
const AppHistory = withRouter(AppRouter);


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default history;
export { reducers, AppHistory };
