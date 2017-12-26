/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 12:29:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {};


/**
 *****************************************
 * 更新窗口
 *****************************************
 */
export default function updateAppContent(target) {
    model.container = target;
}


/**
 *****************************************
 * 挂载节点
 *****************************************
 */
export function mount(el, target = model.container) {

    // 加载节点
    target && target.appendChild(el);

    // 卸载节点
    return function unmount() {
        target && target.removeChild(el);
        return target = el = null;
    };
}
