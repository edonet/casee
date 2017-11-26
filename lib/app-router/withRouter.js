/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-25 09:54:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import AppRoute from './route';


/**
 *****************************************
 * 绑定路由
 *****************************************
 */
export default function withRouter(SubComponent) {
    let AppHOCompoent = props => (
            <AppRoute render={
                history => createElement(SubComponent, { ...props, history })
            } />
        );


    /* 生成组件名称 */
    AppHOCompoent.displayName = `withAppRouter(${ getDisplayName(SubComponent) })`;

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
