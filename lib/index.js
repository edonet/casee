/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-25 16:49:42
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import ReactDOM from 'react-dom';
import style from './style';
import selector from './selector';
import AppContainer from './app-container';
import AppView from './app-view';
import AppLink from './app-link';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default render;
export { style, selector, unmount };
export { AppContainer, AppView, AppLink };


/**
 *****************************************
 * 挂载组件
 *****************************************
 */
function render(App, target) {

    // 获取根节点
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 加载组件
    ReactDOM.render(App, target);
}


/**
 *****************************************
 * 卸载组件
 *****************************************
 */
function unmount(target) {
    return ReactDOM.unmountComponentAtNode(target);
}
