/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-29 21:33:39
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import selector from 'selector';
import { updateTarget, mount, unmount } from './model';


/**
 *****************************************
 * 内容组件
 *****************************************
 */
class AppContent extends Component {

    /* 渲染内容 */
    render() {
        let classList = ['app-content abs box'],
            { ready, platform } = this.props.$device || {};


        // 添加平台样式
        platform && classList.push(platform);

        // 返回元素
        return (
            <article className={ classList.join(' ') } ref={ updateTarget }>
                { ready && this.props.children }
            </article>
        );
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default selector('$device')(AppContent);
export { mount, unmount };
