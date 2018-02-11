/**
 *****************************************
 * Created by lifx
 * Created on 2017-07-21
 *****************************************
 */
'use strict';


/**
 ************************************
 * 加载依赖
 ************************************
 */
import use from './index.scss';
import React, { Component } from 'react';
import contain from '../utils/contain';
import svgx from './svgx';


/**
 ************************************
 * 定义组件
 ************************************
 */
export default class AppIcon extends Component {

    // 初始化组件
    constructor(props, ...args) {
        super(props, ...args);

        // 定义属性
        this.$$target = null;
    }

    // 判断是否需要更新
    shouldComponentUpdate(props) {
        return !contain(this.props, props);
    }

    // 渲染组件
    render() {
        let { size, color, className } = this.props,
            style = {};


        // 设置尺寸
        if (size) {
            style.fontSize = size;
        }

        // 设置颜色
        if (color) {
            style.color = color;
        }

        // 添加自定义样式
        if (this.props.style) {
            style = { ...this.props.style, ...style };
        }

        return (
            <span className={ use('app-icon', className) } style={ style } ref={ el => this.$$target = el } />
        );
    }

    // 挂载图标
    componentDidMount() {
        this.componentDidUpdate();
    }

    // 更新图标
    componentDidUpdate(props = {}) {
        let name = this.props.name || '';

        // 判断是否为线框图标
        if (name && this.props.outline) {
            name += '-outline';
        }

        // 添加元素
        if (name !== props.name) {
            this.$$target.innerHTML = name && svgx[name] || '';
        }
    }
}


/**
 *****************************************
 * 抛出图标列表
 *****************************************
 */
export function keys() {
    return Object.keys(svgx);
}
