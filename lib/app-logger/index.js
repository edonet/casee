/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-23 10:44:11
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';


/**
 *****************************************
 * 日志组件
 *****************************************
 */
export default class AppLogger extends Component {

    /* 初始化 */
    constructor(props, ...args) {
        super(props, ...args);
        this.log('init');
    }

    /* 开始挂载 */
    componentWillMount() {
        this.props.mount && this.log('willMount');
    }

    /* 完成挂载 */
    componentDidMount() {
        this.props.mount && this.log('didMount');
    }

    /* 更新属性 */
    componentWillReceiveProps() {
        this.log('willReceiveProps');
    }

    /* 开始更新 */
    componentWillUpdate() {
        this.props.update && this.log('willUpdate');
    }

    /* 更新完成 */
    componentDidUpdate() {
        this.props.update && this.log('didUpdate');
    }

    /* 渲染组件 */
    render() {
        this.log('render');
        return this.props.children || null;
    }

    /* 打印信息 */
    log(label) {
        console.log(`--> ${this.props.name || 'logger'}:`, label);
    }
}
