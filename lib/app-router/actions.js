/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-02 15:57:36
 *****************************************
 */
'use strict';



/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createAppHistory } from './history';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {};


/**
 *****************************************
 * 创建历史对象
 *****************************************
 */
export function createHistory(context) {

    // 判断缓存是否可用
    if (!(context in model)) {
        let resolve = resolvePath(context),
            history = { context, resolve };


        // 跳转到路径
        history.go = (path, { method = 'PUSH' } = {}) => (
            createAppHistory({ pathname: resolve(path), action: 'PUSH', method })
        );

        // 替换路径
        history.replace = (path, { method = 'REPLACE' } = {}) => (
            createAppHistory({ pathname: resolve(path), action: 'REPLACE', method })
        );

        // 返回路径
        history.goBack = (step = -1, { method = 'POP' } = {}) => {

            // 返回步数
            if (typeof step === 'number') {
                return createAppHistory({ step, action: 'POP', method });
            }

            // 返回到指定路径
            if (typeof step === 'string') {
                createAppHistory({ pathname: resolve(step), action: 'POP', method });
            }
        };

        // 缓存对象
        model[context] = history;
    }

    // 返回对象
    return model[context];
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
