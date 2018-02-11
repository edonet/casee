/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-06 16:48:06
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import { render as renderElement, unmountComponentAtNode } from 'react-dom';
import AppProvider from './index.jsx';


/**
 *****************************************
 * 渲染组件
 *****************************************
 */
export default function render(app, target) {

    // 获取元素
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 渲染元素
    return renderElement(
        <AppProvider>{ app }</AppProvider>, target
    );
}


/**
 *****************************************
 * 卸载组件
 *****************************************
 */
export function unmount(target) {

    // 获取元素
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 卸载组件
    return unmountComponentAtNode(target);
}
