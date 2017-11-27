/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-26 13:01:54
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
import { updateAppRouter } from './actions';



/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRouter extends Component {

    /* 即将挂载组件 */
    componentWillMount() {

        // 添加路由跳转监听
        this.$$unblock = null;

        // 初始化数据
        this.componentWillReceiveProps(this.props);
    }

    /* 定义接收属性接口 */
    componentWillReceiveProps({ history, location }) {

        // 绑定跳转监听
        this.$$unblock && this.$$unblock();
        // this.$$unblock = props.history.block(handleHistoryBlock);

        // 更新路由
        dispatch(updateAppRouter({ history, location }));

        // 更新匹配状态
        // updateMatchedRouter()

    }

    /* 渲染空元素 */
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }

    /* 卸载组件  */
    componentWillUnmount() {

        // 移除路由跳转监听
        this.$$unblock && this.$$unblock();
    }
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withRouter(AppRouter);
