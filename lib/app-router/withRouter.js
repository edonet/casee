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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import selector from 'selector';
import createHistory from './history';


/**
 *****************************************
 * 绑定路由
 *****************************************
 */
export default function withRouter(SubComponent) {

    /* 生成高阶组件 */
    class HOCompoent extends Component {

        /* 初始化组件 */
        constructor(props, ...args) {
            super(props, ...args);

            // 创建历史记录对象
            this.$$history = createHistory(this);
        }

        /* 渲染组件 */
        render() {

            // 返回元素
            return (
                <SubComponent { ...this.props } history={ this.$$history } />
            );
        }
    }


    /* 获取路由上下 */
    HOCompoent.contextTypes = {
        router: PropTypes.shape({
            pathname:  PropTypes.string,
            otherwise: PropTypes.string
        })
    };

    /* 生成组件名称 */
    HOCompoent.displayName = `AppRoute(${ SubComponent.displayName || SubComponent.name || 'Component' })`;

    /* 返回组件 */
    return selector('$router')(HOCompoent);
}
