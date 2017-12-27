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
import selector from 'selector';
import createHistory from './actions';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRoute extends Component {

    // 渲染组件
    render() {
        let context = this.context.$$pathname,
            history = {
                ...this.props.$router, ...createHistory(context)
            };

        // 渲染元素
        return this.props.render(history);
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
export default selector('$router')(AppRoute);
