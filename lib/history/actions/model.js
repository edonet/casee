/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 23:07:52
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const
    model = {
        action: '',
        method: '',
        pathname: '',
        params: null,
        history: null,
        matched: '',
        histories: []
    };


/**
 *****************************************
 * 抛出数据模型
 *****************************************
 */
export default model;


/**
 *****************************************
 * 更新数据模型
 *****************************************
 */
export function updateHistory({ history, location }) {

    // 无需更新
    if (history.pathname === model.pathname) {
        return false;
    }

    let action = history.action,
        pathname = location.pathname,
        { method, path, index } = model.params || {};


    // 更新模型
    model.history = history;
    model.action = action;
    model.pathname = pathname;
    model.method = method;
    model.matched = '';

    // 处理非【api】请求
    if (path !== pathname) {
        model.method = action;
        index = action === 'POP' ? model.histories.lastIndexOf(pathname) : model.histories.length - 1;
    }

    // 初始化路径
    if (!model.histories.length) {
        model.method = 'REPLACE';
        return model.histories = [...model.histories, pathname];
    }

    // 处理路径变化
    switch (action) {
        case 'PUSH':
            model.histories = [...model.histories, pathname];
            break;
        case 'REPLACE':
            model.histories = model.histories.slice(0, index);
            model.histories.push(pathname);
            break;
        default:
            model.histories = index > 0 ? model.histories.slice(0, index) : [pathname];
            break;
    }

    // 更新成功
    return true;
}

