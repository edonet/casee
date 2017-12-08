/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-08 11:09:34
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


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 设置状态
        this.state = { path: '', show: 'false', action: '', isExact: false };
    }

    /* 获取上下文路径 */
    getChildContext() {
        return {
            $$pathname: this.state.path
        };
    }

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {
        let { history, path } = props,
            matched = history.match(path, action => {

                // 更新状态
                this.setState({ action });

                // 更新头部
                this.updateHeader();
            });


        // 获取视图路径
        this.setState({
            path: matched.path,
            show: matched.url || this.state.isExact ? 1 : 0,
            isExact: matched.isExact
        });
    }

    /* 更新头部 */
    updateHeader(props = this.props) {
        let {
                history: { method, length },
                title, navBar = true,
                navBack = length > 1, navLeft = null, navRight = null
            } = props;


        // 更新头部
        updateAppHeader({
            show: navBar, title, navBack, navLeft, navRight, method
        });
    }

    /* 是否需要更新组件 */
    shouldComponentUpdate(props, state) {
        return (
            state.show !== this.state.show ||
            state.action !== this.state.action
        );
    }

    /* 渲染视图 */
    render() {
        let { navBar = true } = this.props,
            { action = '' } = this.state,
            classList = ['app-view abs box'];

        // 添加头部样式
        navBar && classList.push('has-header');
        action && classList.push(action);

        // 更新匹配状态
        this.$$matched = this.$$route;

        console.log('--> render:', this.$$path, !!this.$$matched, this.props.path);

        // 渲染元素
        return appendView(
            <section className={classList.join(' ')}>
                {this.$$show && this.renderElement()}
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
export default withRouter(AppView);
