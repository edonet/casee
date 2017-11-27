/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 22:40:39
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
 * 定义全局id
 *****************************************
 */
let id = 0;


/**
 *****************************************
 * 耗时组件
 *****************************************
 */
export default class AppTimer extends Component {

    constructor(props, ...args) {
        super(props, ...args);

        this.$$id = id ++;
        this.$$name = this.$$id;
    }

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 接收新的属性 */
    componentWillReceiveProps({name}) {

        // 更新名称
        name && (this.$$name = this.$$id + `(${ name })`);
        console.time(this.$$name);
    }

    /* 渲染对象 */
    render() {
        return this.props.children;
    }

    /* 挂载完成 */
    componentDidMount() {
        this.componentDidUpdate();
    }

    /* 更新完成 */
    componentDidUpdate() {
        console.timeEnd(this.$$name);
    }
}
