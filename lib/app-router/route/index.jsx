/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-26 14:28:35
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
import { updateAppState } from '../actions';
import { pushState, replaceState, popState, resolvePath } from '../history';
import matchState from '../match';


/**
 *****************************************
 * 定义路由组件
 *****************************************
 */
class AppRoute extends Component {

    /* 渲染组件 */
    render() {
        let router = {
                ...this.props.$router,
                context: this.context.$$pathname,
                length: this.props.$router.histories.length,
                resolve: (...args) => {
                    return resolvePath(this.context.$$pathname)(...args);
                }
            };


        // 渲染元素
        return this.props.render({
            ...router,
            ...this.createHistory(router)
        });
    }

    /* 创建历史对象 */
    createHistory(router = {}) {
        return {
            go(...args) {
                return updateAppState(pushState(router)(...args));
            },
            replace(...args) {
                return updateAppState(replaceState(router)(...args));
            },
            goBack(...args) {
                return updateAppState(popState(router)(...args));
            },
            match(...args) {
                return matchState(router)(...args);
            }
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
export default selector('$router')(AppRoute);

