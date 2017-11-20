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


/**
 *****************************************
 * 过滤组件
 *****************************************
 */
export default class AppTransition extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 渲染元素
        this.$$element = this.renderElement('in', props.type, props);
    }

    /* 更新组件 */
    shouldComponentUpdate(props) {

        // 无需更新
        if (props.component === this.props.component) {
            return false;
        }

        // 创建新的元素
        this.$$element = [
            this.renderElement('out', props.type, this.props),
            this.renderElement('in', props.type, props)
        ];

        // 更新
        return true;
    }

    /* 渲染组件 */
    render() {
        return this.$$element;
    }

    /* 渲染元素 */
    renderElement(key = 'in', type = 'fade', props = {}) {
        let {
                component, style, className = ''
            } = props,
            classList = [`${ type }-${ key }`];


        // 合并样式
        className && classList.unshift(className);

        // 返回元素
        return (
            <div key={ key } className={ classList.join(' ') } style={ style }>
                { typeof component === 'function' ? createElement(component) : component }
            </div>
        );
    }
}
