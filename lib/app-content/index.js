/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-06 17:41:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import createRouter from '../app-router';
import mount, { append } from './actions';


/**
 *****************************************
 * 内容组件
 *****************************************
 */
export default class AppContent extends Component {

    /* 渲染内容 */
    render() {

        // 创建路由
        createRouter();

        // 返回对象
        return (
            <article className="abs box ovhd" ref={ mount }>
                { this.props.children }
            </article>
        );
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export { append as mount };
