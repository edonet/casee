/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 12:27:22
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import updateAppContent, { mount } from './actions';
import selector from 'selector';


/**
 *****************************************
 * 内容组件
 *****************************************
 */
class AppContent extends Component {

    /* 渲染组件 */
    render() {
        let classList = ['app-content abs box'],
            { platform, ready } = this.props.$device || {};


        // 添加平台信息
        platform && classList.push(platform);

        // 返回元素
        return (
            <div className={ classList.join(' ') } ref={ updateAppContent }>
                { ready && this.props.children }
            </div>
        );
    }
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$device')(AppContent);
export { mount };
