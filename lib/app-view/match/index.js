/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 10:46:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    url: '/', method: 'REPLACE', matched: 0, callback: null, otherwise: []
};


/**
 *****************************************
 * 匹配状态
 *****************************************
 */
export default function matchState({ context, resolve }) {
    return function match(path, callback) {

        // 获取完整路径
        path = resolve(path || './__404__');

        // 过滤【404】路由
        if (path.endsWith('/__404__')) {
            model.otherwise.push({ path, callback });
            return { path, matched: false };
        }

        // 过滤【404】以下的路由
        if (!context.endsWith('/__404__')) {
            let state = matchPath(path);

            // 匹配到路由
            if (state.isExact) {
                model.matched = Infinity;
                invokeStateCallback(callback);
            }

            // 返回匹配状态
            return state;
        }

        // 匹配失败
        return { path, matched: false };
    };
}


/**
 *****************************************
 * 匹配路径
 *****************************************
 */
function matchPath(path, url = model.url) {

    // 完全匹配
    if (url === path) {
        return { path, matched: true, isExact: true };
    }

    // 非完全匹配
    if (url.startsWith(path + '/')) {
        return { path, matched: true, isExact: false };
    }

    // 匹配失败
    return { path, matched: false };
}


/**
 *****************************************
 * 执行状态匹配回调
 *****************************************
 */
function invokeStateCallback(callback) {

    // 执行进入回调
    callback && callback('enter', model.method);

    // 执行退出回调
    model.callback && model.callback('leave', model.method);
    model.callback = callback;
}
