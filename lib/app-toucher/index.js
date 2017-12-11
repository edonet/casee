/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-21 21:46:27
 *****************************************
*/
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDisplayName } from '$$utils/component';
import AppToucher from './index.jsx';


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withToucher('a', { href: 'javascript:;' });
export { withToucher };


/**
 *****************************************
 * 绑定触控
 *****************************************
 */
function withToucher(SubComponent, attrs) {
    let AppHOCompoent = props => (
            <AppToucher { ...attrs } { ...props } component={ SubComponent } />
        );

    /* 生成组件名称 */
    AppHOCompoent.displayName = `withAppToucher(${getDisplayName(SubComponent)})`;

    /* 缩写【SubComponent】上的静态方法 */
    hoistNonReactStatic(AppHOCompoent, SubComponent);

    /* 返回组件 */
    return AppHOCompoent;
}

