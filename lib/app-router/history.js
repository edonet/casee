/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-25 09:41:47
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { matchPath as matchReactRouter } from 'react-router';
import validate, { isString } from '../validete';
import { updateAppState } from './actions';


/**
 *****************************************
 * 创建历史对象
 *****************************************
 */
export default function createHistory(router) {

    router.go = pushState(router);
    router.replace = replaceState(router);
    router.goBack = popState(router);
    router.match = matchState(router);
    router.length = router.histories.length;

    return router;
}


/**
 ************************************
 * 跳转到路径
 ************************************
 */
export function pushState({ pathname, resolve }) {
    return function push(path, { method = 'PUSH' } = {}) {

        // 校验路径
        if (isString(path)) {

            // 解析路径
            path = resolve(path);

            // 跳转路径
            if (path !== pathname) {
                updateAppState({ action: 'PUSH', method, path });
            }
        }
    };
}


/**
 *************************************
 * 替换路径
 *************************************
 */
export function replaceState({ pathname, resolve }) {
    return function replace(path, { method = 'REPLACE' } = {}) {

        // 校验路径
        if (isString(path)) {

            // 解析路径
            path = resolve(path);

            // 跳转路径
            if (path !== pathname) {
                updateAppState({ action: 'REPLACE', method, path });
            }
        }
    };
}



/**{
 *************************************
 * 返回路径 }
 *************************************
 */
export function popState({ histories, pathname, resolve }) {
    return function pop(step = -1) {
        let type = validate(step, 'number', 'string');

        // 无效参数
        if (!step) {
            return false;
        }

        // 指定步数跳转
        if (type === 'number') {
            let len = histories.length,
                idx;

            // 忽略操作
            if (len < 2) {
                return false;
            }

            // 转换步数范围为负值
            step = step > 0 ? -step : step;

            // 获取路由位置
            idx = step + len - 1;

            // 跳转路由
            return updateAppState({
                action: 'POP', method: 'POP', path: histories[idx], step: idx < 0 ? 1 - len : step
            });
        }

        // 指定路径
        if (type === 'string') {
            let path = resolve(step),
                len = histories.length,
                idx;

            // 无需跳转
            if (path === pathname) {
                return false;
            }

            // 获取路径位置
            idx = histories.lastIndexOf(path);

            // 找不到返回路径
            if (idx === -1) {

                // 跳转路由
                return updateAppState({
                    action: 'REPLACE', method: 'POP', path, step: 1 - len
                });
            }

            // 跳转路由
            return updateAppState({
                action: 'POP', method: 'POP', path, step: idx - len + 1
            });
        }
    };
}


/**
 *****************************************
 * 匹配路径
 *****************************************
 */
export function matchState({ pathname, $$matchContext }) {
    return function match(state) {
        let matched = matchReactRouter(pathname, state);

        // 更新匹配状态
        if (matched && matched.isExact) {
            $$matchContext && $$matchContext();
        }

        // 返回匹配结果
        return matched;
    };
}


/**
 *****************************************
 * 解析路过
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


        // 分割路径
        path = context.split('/').concat(path.split('/'));

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
        }, []);

        // 合并路径
        return '/' + path.join('/');
    };
}
