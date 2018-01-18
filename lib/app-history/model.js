/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-15 14:12:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createHistory from 'history/createHashHistory';
import { updateAppRouter } from './actions';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    pathname: '',
    method: 'REPLACE',
    history: createHistory({ forceRefresh: false }),
    histories: [],
    state: null,
    cache: {}
};


/**
 *****************************************
 * 初始化路由
 *****************************************
 */
model.pathname = model.history.location.pathname || '/';
model.histories = [model.pathname];


/**
 *****************************************
 * 监听路径变化
 *****************************************
 */
model.history.listen(updateAppHistory);


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default model;
export { createAppHistory, resolvePath };


/**
 *****************************************
 * 更新路由历史
 *****************************************
 */
function updateAppHistory({ pathname }, action) {
    let state = model.state,
        histories = model.histories,
        len = histories.length,
        callback = updateAppRouter,
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
        callback = state.next || updateAppRouter;
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
 * 创建历史对象
 *****************************************
 */
function createAppHistory(context) {

    // 判断缓存是否可用
    if (!(context in model.cache)) {
        let resolve = resolvePath(context),
            history = { context, resolve };


        // 跳转到路径
        history.go = (path, state) => go(resolve(path), state);

        // 替换路径
        history.replace = (path, state) => replace(resolve(path), state);

        // 返回路径
        history.goBack = (step = -1, state) => {

            // 返回步数
            if (typeof step === 'number') {
                return goBack(step, state);
            }

            // 返回到指定路径
            if (typeof step === 'string') {
                return goBackToPath(resolve(step), state);
            }
        };

        // 缓存对象
        model.cache[context] = history;
    }

    // 返回对象
    return model.cache[context];
}



/**
 *****************************************
 * 解析路径
 *****************************************
 */
function resolvePath(context = '/') {

    // 返回解析函数
    return function resolve(...args) {
        let path = args.reduce((str, curr) => {

            // 过滤非法参数
            if (!curr || typeof curr !== 'string') {
                return str;
            }

            // 返回绝对路径
            if (curr[0] === '/') {
                return curr;
            }

            // 返回连接后的路径
            return str + '/' + curr;
        }, '.');


        // 处理路径
        if (path) {

            // 处理绝对路径
            if (path[0] === '/') {
                return path;
            }

            // 分割路径
            path = context.split('/').concat(path.split('/'));

            // 组合路径
            path = path.reduce((arr, curr) => {
                if (curr === '.' || !curr) {
                    return arr;
                }

                if (curr === '..') {
                    arr.pop();
                } else {
                    arr.push(curr);
                }

                return arr;
            }, []);

            // 合并路径
            return path[0] ? '/' + path.join('/') : path.join('/');
        }

        // 无需处理
        return context;
    };
}


/**
 *****************************************
 * 跳转到指定路径
 *****************************************
 */
function go(pathname, { method = 'PUSH' } = {}) {

    // 忽略同一跳转
    if (pathname === model.pathname) {
        return false;
    }

    // 更新状态
    model.state = { pathname, method, action: 'PUSH' };
    return history.push(pathname);
}


/**
 *****************************************
 * 替换到指定路径
 *****************************************
 */
function replace(pathname, { method = 'REPLACE' } = {}) {

    // 忽略同一跳转
    if (pathname === model.pathname) {
        return false;
    }

    // 更新状态
    model.state = { pathname, method, action: 'REPLACE' };
    return history.push(pathname);
}


/**
 *****************************************
 * 返回到指定路径
 *****************************************
 */
function goBack(step = -1, { method = 'POP' } = {}) {
    let histories = model.histories,
        len = histories.length;


    // 忽略同一跳转
    if (!step) {
        return false;
    }

    // 获取步数
    step = step > 0 ? - step : step;
    step = step + len > 0 ? step : 1 - len;

    // 更新状态
    if (step) {
        model.state = { action: 'POP', method, pathname: histories[len + step - 1] };
        return history.goBack(step);
    }

    // 返回父级
    if (model.pathname !== '/') {
        model.state = { action: 'REPLACE', method, pathname: model.pathname.replace(/\/\w+\/?$/, '') || '' };
        return history.replace(model.state.pathname);
    }
}


/**
 *****************************************
 * 返回到指定路径
 *****************************************
 */
function goBackToPath(pathname, { method = 'POP' } = {}) {

    // 忽略同一跳转
    if (pathname !== model.pathname) {
        let histories = model.histories,
            len = histories.length,
            idx = histories.lastIndexOf(pathname);


        // 存在路由
        if (idx > -1) {
            model.state = { pathname, action: 'POP', method };
            return history.goBack(idx + 1 - len);
        }

        // 定义跳转状态
        model.state = {
            action: 'POP', method, pathname: histories[0],
            next: () => {
                model.state = { action: 'REPLACE', method, pathname };
                history.replace(pathname);
            }
        };

        // 返回
        return history.goBack(1 - len);

    }
}
