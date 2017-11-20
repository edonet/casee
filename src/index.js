/**
 *****************************************
 * Created by lifx
 * Created on 2017-10-12 18:21:02
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import render, { AppProvider } from 'sigo';
import App from './app';


/**
 *****************************************
 * 启动应用
 *****************************************
 */
render((
    <AppProvider title="Sigo"><App /></AppProvider>
), 'app');


/**
 *****************************************
 * 启用热更新
 *****************************************
 */
if (module.hot) {

    // 接收模块更新
    module.hot.accept(['sigo', './app'], () => {
        let app = require('./app');

        // 渲染组件
        render((
            <AppProvider title="Sigo">{ app.default }</AppProvider>
        ), 'app');
    });
}
