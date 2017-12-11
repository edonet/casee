/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-11 16:28:19
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createElement } from 'react';


/**
 *****************************************
 * 渲染元素
 *****************************************
 */
export function renderElement({ render, component = render, children, ...props }) {

    // 使用渲染方法
    if (component) {
        let type = typeof component;

        // 渲染组件
        if (type === 'function' || type === 'string') {
            return createElement(component, props, children);
        }

        // 返回组件
        return component;
    }

    // 渲染子元素
    if (typeof children === 'function') {
        return createElement(children, props);
    }

    // 返回子元素
    return children;
}


/**
 *****************************************
 * 获取组件名称
 *****************************************
 */
export function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
}
