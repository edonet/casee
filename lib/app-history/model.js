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
export function updateAppHistory({ history, location }) {

    // 无需更新
    if (history === model.history) {
        return false;
    }

    let action = history.action,
        pathname = location.pathname,
        { method, path, index } = model.params || {};


    // 更新模型
    model.history = history;
    model.action = action;
    model.pathname = pathname;
    model.method = path === pathname ? method : action;

    // 初始化路径
    if (!model.histories.length) {
        return model.histories.push(pathname) && true;
    }

    // 处理路径变化
    switch (action) {
        case 'PUSH':
            model.histories.push(pathname);
            break;
        case 'REPLACE':
            model.histories = model.histories.slice(0, index);
            model.histories.push(pathname);
            break;
        default:
            model.histories = model.histories.slice(0, index);
            break;
    }

    // 更新成功
    return true;
}

