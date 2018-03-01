/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 11:15:16
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
import Scroll from './scroll';


/**
 *****************************************
 * 滚动组件
 *****************************************
 */
export default class AppScroll extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 初始化属性
        this.$$scroll = new Scroll();

        // 绑定回调
        this.mount = this.mount.bind(this);
    }

    /* 设置后代上下文 */
    getChildContext() {
        return { $$scroll: this.$$scroll };
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className: 'abs box ' + className, style, ref: this.mount };

        // 返回元素
        return (
            <div { ...props }>
                <div>{ children }</div>
            </div>
        );
    }

    /* 更新组件 */
    componentDidUpdate() {
        this.$$scroll && this.$$scroll.refresh(this.props.options);
    }

    /* 挂载对象 */
    mount(el) {
        if (el) {

            // 挂载滚动对象
            this.$$scroll.mountTo(el, this.props.options);

            // 监听滚动开始事件
            this.$$scroll.on('scrollStart', scroll => {
                this.props.onScrollStart && this.props.onScrollStart(scroll);
            });

            // 监听滚动事件
            this.$$scroll.on('scroll', scroll => {
                this.props.onScroll && this.props.onScroll(scroll);
            });

            // 监听滚动结束事件
            this.$$scroll.on('scrollEnd', scroll => {
                this.props.onScrollEnd && this.props.onScrollEnd(scroll);
            });

            this.$$scroll.on('$emit', (name, scroll) => console.log(name, scroll.$$y));
        } else {
            this.$$scroll.destroy();
            this.$$scroll = null;
        }
    }
}


/**
 *****************************************
 * 定义后代上下文类型
 *****************************************
 */
AppScroll.childContextTypes = {
    $$scroll: PropTypes.object
};
