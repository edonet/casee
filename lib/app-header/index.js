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

        // 定义过滤类型
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
                <div className="app-nav-left rel flex">
                    <AppTransition component={ navLeft } />
                </div>
                <h1 className="app-title rel flex nowrap">
                    <AppTransition className="abs box" type={ type } component={ title } />
                </h1>
                <div className="app-nav-left rel flex">
                    <AppTransition component={ navRight } />
                </div>
            </header>
        ) : null;
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
