/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 12:13:39
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component, createElement } from 'react';
import selector from 'selector';
import { appendView } from '../app-content';
import { updateAppHeader } from '../app-header';


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 即将挂载 */
    componentWillMount() {
        this.shouldComponentUpdate(this.props);
    }

    /* 判断是否更新 */
    shouldComponentUpdate(props) {
        return true;
    }

    /* 渲染视图 */
    render() {
        let {
                children, component, render,
                title, navBar: show = true, navBack = true, navLeft = null, navRight = null
            } = this.props;

        // updateAppHeader({ title, show, navBack, navLeft, navRight });

        return appendView(
            <div className="app-view abs box">
                { children }
                { component && createElement(component) }
                { render && createElement(render) }
            </div>
        );
    }
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$history')(AppView);
