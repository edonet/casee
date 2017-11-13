/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-04 10:44:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './style';
import { render } from 'react-dom';
import AppProvider, { updateReducers } from './app-provider';


/**
 *****************************************
 * 更新状态处理器
 *****************************************
 */
updateReducers({ orchid: () => 'v0.1.0' });


/**
 *****************************************
 * 抛出渲染接口
 *****************************************
 */
export default (App, target) => {

    // 获取根节点
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 创建根节点
    if (!target || target.nodeType !== 1) {
        target = document.createElement('div');
        document.body.appendChild(target);
    }

    // 渲染组件
    return render(App, target);
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export { AppProvider };
