/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 11:24:48
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import React, { Component } from 'react';
import AppTransition from '../app-transition';
import AppToucher from '../app-toucher';
import AppIcon from '../app-icon';
import history from '../history';


/**
 *****************************************
 * 定义属性
 *****************************************
 */
let updater = null;


/**
 *****************************************
 * 头部组件
 *****************************************
 */
export default class AppHeader extends Component {

    /* 初始化头部 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义是否可以返回
        this.$$canGoBack = true;

        // 定义过渡类型
        this.$$transition = {
            'POP': 'left-fade',
            'PUSH': 'right-fade',
            'REPLACE': 'fade'
        };

        // 定义状态
        this.state = {
            show: true,
            title: props.title || '',
            navBack: true,
            navLeft: null,
            navRight: null,
            method: 'REPLACE'
        };

        // 绑定回调
        this.handleNavBack = this.handleNavBack.bind(this);
    }

    /* 即将挂载组件 */
    componentWillMount() {

        // 设置更新方法
        updater = state => this.setState(state);
    }

    /* 渲染头部 */
    render() {
        let {
                show, method, title, navBack, navLeft, navRight
            } = this.state,
            type = this.$$transition[method];


        return show ? (
            <header className="app-header abs box row tc">
                <div className={ 'app-nav-left flex rel row' + (navBack ? ' has-nav-back' : '') }>
                    { this.renderNavBack() }
                    <AppTransition className="row pl15" component={ navLeft || 'left' } />
                </div>
                <h1 className="app-title flex rel">
                    <AppTransition className="nowrap" type={ type } component={ title } />
                </h1>
                <div className="app-nav-right flex rel">
                    <AppTransition className="row pr15" component={ navRight || 'right' } />
                </div>
            </header>
        ) : null;
    }

    /* 渲染返回按钮 */
    renderNavBack() {

        // 返回元素
        return (
            <AppToucher className="app-nav-back row pv5 pl15 pr5" onTap={ this.handleNavBack }>
                <AppIcon className="f12" name="arrow-left" />
                <span>返回</span>
            </AppToucher>
        );
    }

    /* 处理返回监听 */
    handleNavBack() {
        let { navBack } = this.state;

        // 阻止返回
        if (!this.$$canGoBack || navBack === false) {
            return;
        }

        // 更新阻止状态
        this.$$canGoBack = false;
        setTimeout(() => {
            this.$$canGoBack = true;
        }, 350);

        // 处理返回函数
        if (typeof navBack === 'function') {
            navBack = navBack(history);
        }

        // 返回到上一路由
        if (navBack === true || navBack === undefined) {
            return history.goBack();
        }

        // 返回指定路由
        if (typeof navBack === 'number' || typeof navBack === 'string') {
            return history.goBack(navBack);
        }
    }
}


/**
 *****************************************
 * 更新状态
 *****************************************
 */
export function updateAppHeader(state) {
    return updater && updater({ ...state });
}
