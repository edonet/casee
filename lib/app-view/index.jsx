/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 14:20:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { render } from '../utils/component';
import { mount } from '../app-content';
import { createRoute } from '../app-router';
import { updateAppHeader } from '../app-header';
import AppScroll from '../app-scroll';
import use from './index.scss';


/**
 *****************************************
 * 视图切换
 *****************************************
 */
const viewAction = {
    ENTER: { 'PUSH': 'right-enter', 'POP': 'left-enter', 'REPLACE': 'show' },
    LEAVE: { 'PUSH': 'left-leave', 'POP': 'right-leave', 'REPLACE': '' }
};


/**
 *****************************************
 * 视图组件
 *****************************************
 */
export default class AppView extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 生成元素
        this.$$target = document.createElement('section');
        this.$$target.className = use('app-view', 'abs box');

        // 添加元素
        this.$$unmount = mount(this.$$target);

        // 创建路由
        this.$$route = createRoute();

        // 设置状态
        this.state = this.matchState(props, context);

        // 设置属性
        this.$$show = this.state.matched;

        // 绑定回调
        this.handleChange = this.handleChange.bind(this);
    }

    /* 设置后代上下文 */
    getChildContext() {
        return { $$pathname: this.state.path };
    }

    /* 更新组件属性 */
    componentWillReceiveProps(props, context) {
        let state = this.matchState(props, context);

        // 更新状态
        props.path && this.setState(state);
    }

    /* 匹配状态 */
    matchState(props, { $$pathname: context = '/' }) {
        return this.$$route.match({
            path: props.path, context, callback: this.handleChange(props)
        });
    }

    /* 即将更新 */
    componentWillUpdate(props, state) {
        this.$$show = state.matched || this.state.matched;
    }

    /* 渲染视图 */
    render() {
        return createPortal(
            this.$$show && <AppScroll>{ render(this.props) }</AppScroll>,
            this.$$target
        );
    }

    /* 挂载完成 */
    componentDidMount() {
        this.$$route.resolve();
    }

    /* 更新完成 */
    componentDidUpdate() {
        this.$$route.resolve();
    }

    /* 移除组件 */
    componentWillUnmount() {

        // 卸载视图
        this.$$unmount();
        this.$$route.destroy();

        // 销毁属性
        this.$$unmount = null;
        this.$$target = null;
        this.$$route = null;
    }

    /* 切换视图 */
    handleChange(props) {
        return (action, { method }) => {
            if (this.$$target) {
                let { title, navBack, navLeft, navRight } = props,
                    show = title !== undefined;

                // 打印信息
                console.log(`--> ${ this.state.path }:`, action, method);

                // 更新头部
                if (action === 'ENTER') {
                    console.log(props);
                    updateAppHeader({
                        show, title, method, navBack, navLeft, navRight
                    });
                }

                // 切换视图
                this.$$target.className = use('app-view', 'abs box', show && 'has-header', viewAction[action][method]);

                // 更新状态
                props.path || this.setState({ matched: action === 'ENTER' });
            }
        };
    }
}


/**
 *****************************************
 * 获取路由上下文
 *****************************************
 */
AppView.contextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 定义后代上下文类型
 *****************************************
 */
AppView.childContextTypes = {
    $$pathname: PropTypes.string
};

