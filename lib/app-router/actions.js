/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-24 18:50:07
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { UPDATE_APP_ROUTER } from './actionTypes';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const
    model = {
        pathname: '/',
        action: '',
        method: '',
        histories: ['/']
    };


/**
 *****************************************
 * 更新路由信息
 *****************************************
 */
export function updateAppRoute({ history, location }) {

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
