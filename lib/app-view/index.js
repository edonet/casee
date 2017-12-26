/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 11:34:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { render as renderComponent } from '$$component';
import { mount } from '../app-content';


/**
 *****************************************
 * 视图组件
 *****************************************
 */
export default class AppView extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义容器
        this.$$container = document.createElement('section');

        // 定义状态
        this.state = { show: false };

        // 挂载容器
        this.$$unmount = mount(this.$$container);
    }

    /* 渲染元素 */
    render() {
        return createPortal(
            this.state.show && renderComponent(this.props), this.$$container
        );
    }

    /* 卸载组件 */
    componentWillUnmount() {
        this.$$unmount();
        this.$$container = null;
    }
}
