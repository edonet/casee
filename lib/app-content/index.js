/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 11:39:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import selector from 'selector';


/**
 *****************************************
 * 定义属性
 *****************************************
 */
let target = null;


/**
 *****************************************
 * 内容组件
 *****************************************
 */
class AppContent extends Component {

    /* 渲染内容 */
    render() {
        return (
            <article className="app-content abs box ovhd" ref={ el => target = el }>
                { this.props.$app.ready && this.props.children }
            </article>
        );
    }
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$app')(AppContent);


/**
 *****************************************
 * 添加视图
 *****************************************
 */
export function appendView(view) {
    return target ? createPortal(view, target) : null;
}
