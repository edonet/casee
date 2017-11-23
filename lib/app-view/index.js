/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 12:13:39
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import selector from 'selector';
import { appendView } from '../app-content';
import { updateAppHeader } from '../app-header';
import { resolve } from '../app-link';
import history from '../history/actions';


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 定义属性
        this.$$path = '';
        this.$$show = false;
        this.$$update = false;
        this.$$hasHeader = true;
        this.$$anim = '';
        this.$$matched = null;

        // 配置过渡动画
        this.$$enterAnim = { 'PUSH': 'right-enter z1000', 'POP': 'left-enter', 'REPLACE': 'z1000' };
        this.$$leaveAnim = { 'PUSH': 'left-leave', 'POP': 'right-leave z1000', 'REPLACE': 'hide' };
    }

    /* 获取上下文路径 */
    getChildContext() {
        return { pathname: this.$$path };
    }

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props, this.context);
    }

    /* 更新属性 */
    componentWillReceiveProps(props, context) {

        // 获取路径
        if (props.path) {
            this.$$path = resolve(context.pathname, props.path);
        } else if (history.pathname.startsWith(context.pathname)) {
            this.$$path = history.pathname;
        } else {
            this.props = context.pathname + '/404';
        }

        // 获取路由匹配信息
        this.$$matched = this.updateView(props);
    }

    /* 更新视图 */
    updateView(props) {
        let { pathname, method } = props.$history,
            matched = history.matched ? null : matchPath(pathname, {
                path: this.$$path,
                exact: props.exact,
                strict: props.strict
            });


        // 进入视图配置
        if (matched) {

            // 完全匹配
            if (matched.isExact) {

                // 显示组件
                this.$$show = true;
                this.$$update = true;

                // 配置转场动画
                this.$$anim = this.$$enterAnim[method];

                // 更新头部
                this.updateHeader(props);

                // 更新匹配路径
                history.matchPath(pathname);

                // 返回匹配信息
                return matched;

            } else if (!this.$$matched) {

                // 显示组件
                this.$$show = true;
                this.$$update = true;

                // 配置转场动画
                this.$$anim = '';

                // 返回匹配信息
                return matched;
            }
        }

        // 退出视图配置
        if (this.$$matched) {

            // 显示组件
            this.$$show = true;
            this.$$update = this.$$matched.isExact;

            // 配置转场动画
            this.$$anim = this.$$leaveAnim[method];

            // 返回匹配信息
            return matched;
        }

        // 隐藏视图
        this.$$anim = 'hide';

        // 卸载视图
        this.$$update = this.$$show !== false;
        this.$$show = false;

        // 返回匹配信息
        return matched;
    }

    /* 更新头部 */
    updateHeader(props) {
        let
            {
                title, navBar = true, navBack, navLeft, navRight,
                $history: { method, histories }
            } = props;


        // 设置返回默认值
        if (navBack === undefined) {
            navBack = histories.length > 1;
        }

        // 更新头部
        updateAppHeader({
            show: navBar, title, navBack, navLeft, navRight, method
        });

        // 判断是否有头部
        this.$$hasHeader = navBar;
    }

    /* 是否需要更新组件 */
    shouldComponentUpdate() {
        return this.$$update;
    }

    /* 渲染视图 */
    render() {
        let classList = ['app-view abs box'];

        // 添加头部样式
        this.$$hasHeader && classList.push('has-header');
        this.$$anim && classList.push(this.$$anim);

        // 渲染元素
        return appendView(
            <section className={ classList.join(' ') }>
                { this.$$show && this.renderElement() }
            </section>
        );
    }

    /* 渲染元素 */
    renderElement() {
        let {
                children, render = children, component = render
            } = this.props;

        // 渲染元素
        return (
            typeof component === 'function' ? createElement(component) : component
        );
    }
}


/**
 *****************************************
 * 定义子上下文类型
 *****************************************
 */
AppView.childContextTypes = {
    pathname: PropTypes.string
};


/**
 *****************************************
 * 定义上下文类型
 *****************************************
 */
AppView.contextTypes = {
    pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$history')(AppView);
