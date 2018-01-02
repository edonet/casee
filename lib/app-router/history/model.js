/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 15:42:34
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createHistory from 'history/createHashHistory';
import { dispatch } from 'selector';
import { isFunction } from 'validate';
import { updateAppRouter } from './actions';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    pathname: '',
    method: '',
    history: createHistory({ forceRefresh: false }),
    histories: [],
    listeners: [],
    state: null
};


/**
 *****************************************
 * 监听路径变化
 *****************************************
 */
model.history.listen(updateAppHistory);


/**
 *****************************************
 * 更新路由历史
 *****************************************
 */
function updateAppHistory({ pathname }, action) {
    let state = model.state,
        histories = model.histories,
        len = histories.length,
        callback = updateState,
        method;


    // 忽略同一跳转
    if (pathname === model.pathname) {
        return model.state = null;
    }

    // 处理状态
    if (!state) {
        method = action = histories[len - 2] === pathname ? 'POP' : 'PUSH';
    } else if (state.pathname === pathname && state.action === action) {
        method = state.method || action;
        callback = state.next || updateState;
    }

    // 更新路由记录
    switch (action) {
        case 'PUSH':
            histories = histories.concat([pathname]);
            break;
        case 'REPLACE':
            histories = histories.slice(0, -1).concat([pathname]);
            break;
        case 'POP':
            histories = histories.slice(0, Math.max(0, histories.lastIndexOf(pathname) + 1));
            break;
        default:
            break;
    }

    // 更新数据模型
    model.pathname = pathname;
    model.method = method;
    model.histories = histories;
    model.state = null;

    // 执行更新回调
    return callback({
        pathname, method, histories, length: histories.length
    });
}


/**
 *****************************************
 * 初始化路由历史
 *****************************************
 */
function initAppHistory() {
    let pathname = model.history.location.pathname,
        state = {
            pathname, method: 'REPLACE', histories: [pathname], length: 1
        };

    // 更新数据模型
    model.pathname = pathname;
    model.histories = state.histories;
    model.method = state.method;
    model.state = null;

    // 更新状态
    return updateState(state);
}


/**
 *****************************************
 * 创建路由历史
 *****************************************
 */
function createAppHistory({ pathname, step = -1, action = 'PUSH', method = action }) {
    let { history, histories } = model,
        len = histories.length;


    // 忽略同一跳转
    if (pathname === histories[len - 1]) {
        return false;
    }

    // 跳转到路径
    if (action === 'PUSH') {
        model.state = { pathname, action, method };
        return history.push(pathname);
    }

    // 替换路径
    if (action === 'REPLACE') {
        model.state = { pathname, action, method };
        return history.replace(pathname);
    }

    // 返回路径
    if (action === 'POP') {

        // 返回指定路径
        if (pathname) {
            let idx = histories.lastIndexOf(pathname);

            if (idx > -1) {
                model.state = { pathname, action, method };
                return history.goBack(idx + 1 - len);
            }

            // 定义跳转状态
            model.state = {
                pathname, action, method,
                next: () => {
                    model.state = { pathname, action: 'REPLACE', method };
                    history.replace(pathname);
                }
            };

            // 返回
            history.goBack(1 - len);
        }

        // 返回指定步数
        if (step) {

            // 修复参数
            step = step > 0 ? - step : step;

            // 判断是否超出范围
            step = len + step < 1 ? 1 - len : step;

            // 设置跳转状态
            model.state = { pathname: histories[len + step - 1], action, method };
            history.goBack(step);
        }
    }
}


/**
 *****************************************
 * 更新状态
 *****************************************
 */
function updateState(state) {

    // 执行订阅回调
    model.listeners.forEach(listener => listener(state));

    // 更新状态
    dispatch(updateAppRouter(state));
}


/**
 *****************************************
 * 添加路由监听
 *****************************************
 */
function subscribe(listener) {
    return isFunction(listener) && model.listeners.push(listener);
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default model;
export { initAppHistory, createAppHistory, subscribe };
