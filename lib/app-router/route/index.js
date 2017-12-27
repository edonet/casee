/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 17:10:47
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
import { getDisplayName } from '$$component';
import AppRoute from './index.jsx';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default withRouter;


/**
 *****************************************
 * 绑定路由组件
 *****************************************
 */
function withRouter(SubComponent, attrs) {
    let AppHOCompoent = props => (
        <AppRoute { ...attrs } render={
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
