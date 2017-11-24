/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 19:16:06
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


/**
 *****************************************
 * 过滤组件
 *****************************************
 */
export default class AppTransition extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义属性
        this.$$id = 0;

        // 渲染元素
        this.$$element = this.renderElement(this.$$id, 'in', props.type, props);
    }

    /* 更新组件 */
    shouldComponentUpdate(props) {

        // 无需更新
        if (props.component === this.props.component) {
            return false;
        }

        // 创建新的元素
        this.$$element = [
            this.renderElement(this.$$id ? this.$$id -- : this.$$id ++, 'out', props.type, this.props),
            this.renderElement(this.$$id, 'in', props.type, props)
        ];

        // 更新
        return true;
    }

    /* 渲染组件 */
    render() {
        let { wrapper, className, style } = this.props,
            classList = ['rel'];


        // 添加样式
        className && classList.unshift(className);

        // 返回元素
        return wrapper ? (
            <div className={ classList.join(' ') } style={ style }>
                { this.$$element }
            </div>
        ) : this.$$element;
    }

    /* 渲染元素 */
    renderElement(id, key = 'in', type = 'fade', props = {}) {
        let {
                component, style, className = '', wrapper
            } = props,
            classList = ['app-transition abs box', `${ type }-${ key }`];


        // 添加样式
        !wrapper && className && classList.splice(1, 0, className);

        // 返回元素
        return component ? (
            <div key={ id } className={ classList.join(' ') } style={ wrapper ? null : style }>
                { typeof component === 'function' ? createElement(component) : component }
            </div>
        ) : null;
    }
}
