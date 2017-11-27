/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 22:48:18
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
import AppTimer from './timer';


/**
 *****************************************
 * 绑定耗时组件
 *****************************************
 */
export default function withTimer(name, SubComponent) {
    let AppHOCompoent = props => (
        <AppTimer name={ props[name] }>
            <SubComponent { ...props } />
        </AppTimer>
    );


    /* 生成组件名称 */
    AppHOCompoent.displayName = `withAppTimer(${getDisplayName(SubComponent)})`;

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
