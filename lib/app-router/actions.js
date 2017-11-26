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
        state: null,
        history: null,
        histories: []
    };


/**
 *****************************************
 * 更新路由信息
 *****************************************
 */
export function updateAppRouter({ history, location }) {
    let { action } = history,
        { pathname } = location,
        histories = model.histories,
        len = histories.length,
        method;


    // 获取跳转状态
    if (model.state && model.state.path === pathname) {
        method = model.state.method || action;
    } else {
        method = action;
    }

    // 处理路由历史
    if (len) {

        // 处理路由行为
        if (action === 'PUSH') {

            // 添加历史记录
            histories = histories[len - 1] === pathname ? histories : [...histories, pathname];

        } else if (action === 'REPLACE' && method !== 'POP') {

            // 替换路由
            histories = histories.slice(0, len - 1).concat([pathname]);

        } else {

            // 弹出路由
            (idx => {
                histories = idx > 0 ? histories.slice(0, idx + 1) : [pathname];
            })(histories.lastIndexOf(pathname));
        }

    } else {

        // 初始化路径
        method = 'REPLACE';
        histories = [pathname];
    }

    // 更新数据对象
    model.state = null;
    model.history = history;
    model.histories = histories;

    // 返回数据
    return {
        type: UPDATE_APP_ROUTER,
        data: {
            action, pathname, method, histories
        }
    };
}


/**
 *****************************************
 * 更新路由状态
 *****************************************
 */
export function updateAppState({ action, method = action, path, step }) {

    // 更新路由状态
    model.state = { path, method, step };

    // 执行跳转
    switch (action) {
        case 'PUSH':
            model.history.push(path);
            break;
        case 'POP':
            model.history.go(step);
            break;
        default:
            model.history.replace(path);
            break;
    }
}


/**
 *****************************************
 * 解析路径
 *****************************************
 */
export function resolvePath(context = '/') {

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
            }, '');


        // 处理路径
        if (path) {

            // 分割路径
            path = path.split('/');
            context = context === '/' ? [] : context.split('/');

            // 组合路径
            path = path.reduce((arr, curr) => {
                if (curr === '.' || !curr) {
                    return arr;
                }

                if (/^\.\.+$/.test(curr)) {
                    arr.pop();
                } else {
                    arr.push(curr);
                }

                return arr;
            }, context);

            // 合并路径
            return '/' + path.join('/');
        }

        // 无需处理
        return context;
    };
}
