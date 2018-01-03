/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-30 19:09:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { updateAppStore } from './store';
import AppProvider from './index.jsx';


/**
 *****************************************
 * 挂载组件
 *****************************************
 */
export default function mount(App, target) {

    // 获取元素
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 渲染元素
    return render(
        <AppProvider>{ App }</AppProvider>, target
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

    // 渲染元素
    return unmountComponentAtNode(target);
}


/**
 *****************************************
 * 更新数据
 *****************************************
 */
export { updateAppStore };
