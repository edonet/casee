/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 14:34:00
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
 * 渲染组件
 *****************************************
 */
export function render({ render, component = render, children = null, ...rest } = {}, props = null) {
    let type = component && typeof component;

    // 合并属性
    props = { ...rest, ...props };

    // 返回渲染结果
    return (
        type === 'function' ? component(props) : (
            type === 'string' ? createElement(component, props, children) : (
                typeof children === 'function' ? children(props) : children || null
            )
        )
    );
}


/**
 *****************************************
 * 获取组件名称
 *****************************************
 */
export function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
}

