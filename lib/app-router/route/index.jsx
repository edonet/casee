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
import { matchPath } from 'react-router';
import selector from 'selector';
import * as history from '../history';


/**
 *****************************************
 * 定义路由组件
 *****************************************
 */
class AppRoute extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 生成路由代理
        this.$$proxy = this.createProxy();
    }

    /* 渲染组件 */
    render() {

        // 渲染元素
        return this.props.render(this.$$proxy);
    }

    /* 生成代理 */
    createProxy(router = this) {
        return {
            ...this.createHistory(),
            get action() {
                return router.props.$router.action;
            },
            get method() {
                return router.props.$router.method;
            },
            get pathname() {
                return router.props.$router.pathname;
            },
            get histories() {
                return router.props.$router.histories;
            },
            get length() {
                return router.props.$router.length;
            },
            get context() {
                return router.context.$$pathname;
            },
            get matched() {
                return router.context.$$matched;
            },
            matchContext(matched) {
                if (router.context.$$matchContext) {
                    router.context.$$matchContext(matched);
                }
            }
        };
    }

    /* 创建历史对象 */
    createHistory(router = this) {
        let resolve = (...args) => {
                return history.resolvePath(router.context.$$pathname)(...args);
            };

        return {
            resolve,
            go(...args) {
                return history.pushState({
                    resolve,
                    pathname: router.props.$router.pathname
                })(...args);
            },
            replace(...args) {
                return history.replaceState({
                    resolve,
                    pathname: router.props.$router.pathname
                })(...args);
            },
            goBack(...args) {
                return history.popState({
                    resolve,
                    pathname: router.props.$router.pathname,
                    histories: router.props.$router.histories
                })(...args);
            },
            match(state) {
                let matchContext = router.context.$$matchContext,
                    matched= matchPath(
                        router.props.$router.pathname, state
                    );

                // 更新上下文匹配
                if (matched && matched.isExact) {
                    matchContext && matchContext(matched.url);
                }

                // 返回匹配结果
                return matched;
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
    $$pathname: PropTypes.string,
    $$matched: PropTypes.string,
    $$matchContext: PropTypes.func
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$router')(AppRoute);

