/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-26 14:50:28
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
import { withRouter } from '../app-router';
import { appendView } from '../app-content';
import { updateAppHeader } from '../app-header';
import withTimer from './withTimer';


/**
 *****************************************
 * 定义转场动画
 *****************************************
 */
const
    anim = {
        enter: { 'PUSH': 'right-enter z1000', 'POP': 'left-enter', 'REPLACE': 'z1000' },
        leave: { 'PUSH': 'left-leave', 'POP': 'right-leave z1000', 'REPLACE': 'hide' }
    };


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
        this.$$route = null;
        this.$$matched = null;
        this.$$hasHeader = true;
        this.$$anim = '';

        // 设置状态
        this.state = { path: '' };
    }

    /* 获取上下文路径 */
    getChildContext() {
        return {
            $$pathname: this.$$path
        };
    }

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {
        let { history, path } = props;


        // 获取视图路径
        this.$$path = history.resolve(path || '__other__');

        // 获取匹配结果
        this.$$route = this.updateView(
            props, history.match(path, () => console.log(path) || this.setState({ path: history.pathname }))
        );
    }

    /* 更新匹配状态 */
    updateView(props, matched = null) {
        let { method } = props.history;


        // 进入视图
        if (matched) {

            // 完全配置
            if (matched.isExact) {

                // 更新状态
                this.$$show = true;
                this.$$update = true;
                this.$$anim = anim.enter[method];

                // 更新头部
                this.updateHeader(props);

                // 更新路由状态
                return matched;

            }

            // 不完全匹配
            if (!this.$$matched) {

                // 更新状态
                this.$$show = true;
                this.$$update = true;
                this.$$anim = '';

                // 更新路由状态
                return matched;
            }
        }

        // 退出视图配置
        if (this.$$matched) {

            // 显示组件
            this.$$show = true;
            this.$$update = this.$$matched.isExact;
            this.$$anim = anim.leave[method];

            // 返回匹配信息
            return matched;
        }

        // 隐藏视图
        this.$$anim = 'hide';
        this.$$update = this.$$show !== false;
        this.$$show = false;

        // 返回匹配信息
        return matched;
    }

    /* 更新头部 */
    updateHeader(props) {
        let {
                history: { method, length },
                title, navBar = true,
                navBack = length > 1, navLeft = null, navRight = null
            } = props;


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

        // 更新匹配状态
        this.$$matched = this.$$route;

        console.log('--> render:', this.$$path, !!this.$$matched, this.props.path);

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
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withTimer('path', withRouter(AppView));
