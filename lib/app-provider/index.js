/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 14:40:48
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { render, unmountComponentAtNode } from 'react-dom';


/**
 *****************************************
 * 定义元素
 *****************************************
 */
const model = {
    appRoot: document.createElement('div'),
    appTarget: document.createElement('div')
};


/**
 *****************************************
 * 定义元素样式
 *****************************************
 */
model.appTarget.className = 'abs box';


/**
 *****************************************
 * 挂载元素
 *****************************************
 */
export default function mount(App, target) {

    // 获取元素
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 挂载节点
    if (target !== model.appTarget.parentNode) {
        target.appendChild(model.appTarget);
    }

    // 挂载组件
    return render(App, model.appRoot);
}


/**
 *****************************************
 * 卸载元素
 *****************************************
 */
export function unmount(target) {

    // 获取元素
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 卸载元素
    target.removeChild(model.appTarget);

    // 卸载组件
    unmountComponentAtNode(model.appRoot);
}


/**
 *****************************************
 * 添加节点
 *****************************************
 */
export function appendToTarget(el) {
    return model.appTarget.appendChild(el);
}


/**
 *****************************************
 * 移除节点
 *****************************************
 */
export function removeFromTarget(el) {
    return model.appTarget.removeChild(el);
}
