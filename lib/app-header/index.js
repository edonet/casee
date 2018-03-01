/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 21:52:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import observer from '../utils/observer';
import AppTransition from '../app-transition';
import AppLink from '../app-link';
import AppIcon from '../app-icon';
import history from '../history';
import use from './index.scss';


/**
 *****************************************
 * 定义头部更新器
 *****************************************
 */
const ob = observer();


/**
 *****************************************
 * 头部组件
 *****************************************
 */
export default class AppHeader extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义属性
        this.$$canGoBack = true;
        this.$$actionType = { 'POP': 'left-fade', 'PUSH': 'right-fade', 'REPLACE': 'fade' };
        this.$$observer = observer();

        // 定义状态
        this.state = {
            show: true,
            title: props.title || '',
            method: 'REPLACE',
            navBack: false,
            navLeft: null,
            navRight: null
        };

        // 绑定更新回调
        this.$$unsubscribe = ob.subscribe(data => {
            this.setState({
                show: data.show !== false,
                title: data.title || '',
                method: data.method || 'REPLACE',
                navBack: data.navBack === undefined ? history.length > 1 : data.navBack,
                navLeft: data.navLeft || null,
                navRight: data.navRight || null
            });
        });

        // 绑定回调
        this.handleNavBack = this.handleNavBack.bind(this);
    }

    /* 渲染组件 */
    render() {
        let { show, title, method, navBack, navLeft, navRight } = this.state,
            action = this.$$actionType[method];

        // 返回元素
        return (
            <header className={ use('app-header', 'abs row', show && 'show') }>
                <div className={ use('app-nav-box', 'rel lock', navBack && 'has-nav-back') }>
                    { navBack && this.renderNavBack() }
                    <div className={ use('app-nav-left', 'abs box') }>
                        <AppTransition className="row" component={ navLeft } />
                    </div>
                </div>
                <h1 className={ use('app-title', 'rel f18 flex tc') }>
                    <AppTransition className="tc" action={ action } component={ title } />
                </h1>
                <div className={ use('app-nav-box', 'app-nav-right', 'rel lock')}>
                    <AppTransition className={ use('row', 'right') } component={ navRight } />
                </div>
            </header>
        );
    }

    /* 渲染返回按钮 */
    renderNavBack() {

        // 返回元素
        return (
            <AppLink className={ use('app-nav-back', 'row pr5') } onTap={ this.handleNavBack }>
                <AppIcon name="arrow-left" size="1.6em" />
                <span>返回</span>
            </AppLink>
        );
    }

    /* 处理返回监听 */
    handleNavBack() {
        let { navBack } = this.state;

        // 阻止返回
        if (!this.$$canGoBack || navBack === false) {
            return false;
        }

        // 更新阻止状态
        this.$$canGoBack = false;

        // 恢复阻止状态
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

    /* 即将卸载组件 */
    componentWillUnmount() {
        this.$$unsubscribe();
        this.$$unsubscribe = null;
    }
}


/**
 *****************************************
 * 更新头部
 *****************************************
 */
export function updateAppHeader(data) {
    return ob.publish(data);
}
