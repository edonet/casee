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
import React, { Component, createElement } from 'react';
import use from './index.scss';


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
        this.$$element = this.createElement(this.$$id, props.action, 'in', props);
    }

    /* 更新组件 */
    shouldComponentUpdate(props) {

        // 无需更新
        if (props.component === this.props.component) {
            return false;
        }

        // 创建新的元素
        this.$$element = [
            this.createElement(this.$$id ? this.$$id -- : this.$$id ++, props.action, 'out', this.props),
            this.createElement(this.$$id, props.action, 'in', props)
        ];

        // 更新
        return true;
    }

    /* 渲染组件 */
    render() {
        return this.$$element;
    }

    /* 创建元素 */
    createElement(id, action = 'fade', method = 'in', props = {}) {
        let { component, style, className } = props;

        // 生成样式
        className = use('app-transition', className, 'abs box nowrap', action + '-' + method);

        // 返回元素
        return component ? (
            <div key={ id } className={ className } style={ style }>
                { typeof component === 'function' ? createElement(component) : component }
            </div>
        ) : null;
    }
}
