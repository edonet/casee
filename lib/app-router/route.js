/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-25 15:46:32
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
import createHistory, { resolvePath } from './history';


/**
 *****************************************
 * 定义路由组件
 *****************************************
 */
class AppRoute extends Component {

    /* 渲染组件 */
    render() {

        // 渲染元素
        return this.props.render(createHistory({
            ...this.props.$router,
            context: this.context.$$pathname,
            otherwise: this.context.$$otherwise,
            $$matchContext: this.context.$$match,
            resolve: resolvePath(this.context.$$pathname),
            matched: this.context.$$otherwise === './404'
        }));
    }
}



/**
 *****************************************
 * 获取路由上下文
 *****************************************
 */
AppRoute.contextTypes = {
    $$pathname: PropTypes.string,
    $$otherwise: PropTypes.string,
    $$matched: PropTypes.func
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$router')(AppRoute);
