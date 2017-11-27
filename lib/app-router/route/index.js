/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-26 14:26:19
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { createElement } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import AppRoute from './index.jsx';


/**
 *****************************************
 * 绑定路由组件
 *****************************************
 */
export default function withRouter(SubComponent) {
    let AppHOCompoent = props => (
        <AppRoute render={
            history => createElement(SubComponent, { ...props, history })
        } />
    );


    /* 生成组件名称 */
    AppHOCompoent.displayName = `withAppRouter(${getDisplayName(SubComponent)})`;

    /* 缩写【SubComponent】上的静态方法 */
    hoistNonReactStatic(AppHOCompoent, SubComponent);

    /* 返回组件 */
    return AppHOCompoent;
}


/**
 *****************************************
 * 创建khmh
 *****************************************
 */
function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
}
