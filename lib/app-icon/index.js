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
import './index.scss';
import React, { Component } from 'react';
import svgx from './svgx';


/**
 ************************************
 * 预设图标
 ************************************
 */
const
    icons = {
        'arrow-left': 'ic-arrow-left',
        'arrow-right': 'ic-arrow-right',
        'arrow-up': 'ic-arrow-up',
        'arrow-down': 'ic-arrow-down',
        'checkmark': 'ic-checkmark'
    };


/**
 ************************************
 * 定义组件
 ************************************
 */
export default class AppIcon extends Component {

    // 初始化组件
    constructor(props, ...args) {
        super(props, ...args);
        this.renderAppIcon = this.renderAppIcon.bind(this);
    }

    // 渲染组件
    render() {
        let { name, size, color } = this.props,
            className = ['app-icon'],
            style = {};


        // 设置尺寸
        if (size) {
            style.fontSize = size;
        }

        // 设置颜色
        if (color) {
            style.color = color;
        }

        // 添加自定义类
        if (this.props.className) {
            className.push(this.props.className);
        }

        // 添加自定义样式
        if (this.props.style) {
            style = { ...this.props.style, ...style };
        }

        // 获取预设图片
        if (name in icons) {

            // 添加图标样式
            className.push(icons[name]);

            // 返回组件
            return (
                <span className={ className.join(' ') } { ...style } />
            );
        }

        return (
            <span className={ className.join(' ') } { ...style } ref={ this.renderAppIcon } />
        );
    }

    // 挂载图标
    renderAppIcon(el) {
        if (el) {
            let name = this.props.name;

            if (name && name in svgx) {
                el.innerHTML = svgx[name];
            }
        }
    }
}
