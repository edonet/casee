/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-11 11:31:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import { render as renderElement } from 'react-dom';
import AppProvider from './index.jsx';
import { updateAppStore } from './store';


/**
 *****************************************
 * 渲染方法
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
 * 抛出接口
 *****************************************
 */
export { updateAppStore };
