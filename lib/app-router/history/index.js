/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-26 14:36:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import validate, { isString } from 'validate';


/**
 ************************************
 * 跳转到路径
 ************************************
 */
export function pushState(router) {
    return function push(path, { method = 'PUSH' } = {}) {
        let { pathname, resolve } = router;

        // 校验路径
        if (isString(path)) {

            // 解析路径
            path = resolve(path);

            // 跳转路径
            if (path !== pathname) {
                return { action: 'PUSH', method, path };
            }
        }

        // 不作跳转
        return null;
    };
}


/**
 *************************************
 * 替换路径
 *************************************
 */
export function replaceState(router) {
    return function replace(path, { method = 'REPLACE' } = {}) {
        let { pathname, resolve } = router;

        // 校验路径
        if (isString(path)) {

            // 解析路径
            path = resolve(path);

            // 跳转路径
            if (path !== pathname) {
                return { action: 'REPLACE', method, path };
            }
        }

        // 不作跳转
        return null;
    };
}



/**{
 *************************************
 * 返回路径 }
 *************************************
 */
export function popState(router) {
    return function pop(step = -1) {
        let { histories, pathname, resolve } = router,
            type = validate(step, 'number', 'string');

        // 无效参数
        if (!step) {
            return null;
        }

        // 指定步数跳转
        if (type === 'number') {
            let len = histories.length,
                idx;

            // 忽略操作
            if (len < 2) {
                return null;
            }

            // 转换步数范围为负值
            step = step > 0 ? -step : step;

            // 获取路由位置
            idx = step + len - 1;

            // 跳转路由
            return idx < 0 ? {
                action: 'POP', method: 'POP', path: histories[0], step: 1 - len
            } : {
                action: 'POP', method: 'POP', path: histories[idx], step
            };
        }

        // 指定路径
        if (type === 'string') {
            let path = resolve(step),
                len = histories.length,
                idx;

            // 无需跳转
            if (path === pathname) {
                return null;
            }

            // 获取路径位置
            idx = histories.lastIndexOf(path);

            // 找不到返回路径
            if (idx === -1) {

                // 跳转路由
                return {
                    action: 'REPLACE', method: 'POP', path, step: 1 - len
                };
            }

            // 跳转路由
            return {
                action: 'POP', method: 'POP', path, step: idx - len + 1
            };
        }

        // 不作跳转
        return null;
    };
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
