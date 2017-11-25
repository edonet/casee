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
import validete, { isString } from '../validete';
import validate from '../validete';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = { history: null };


/**
 *****************************************
 * 创建历史记录
 *****************************************
 */
export default function createHistory(router) {
    let proxy = createRouterProxy(router),
        resolve = resolvePath(proxy),
        push = pushState(proxy, resolve),
        replace = replaceState(proxy, resolve),
        pop = popState(proxy, resolve);

    // 返回对象
    return {
        ...proxy,
        push, replace, pop,
        resolve, go: push, goBack: pop
    };
}


/**
 *****************************************
 * 更新数据模型
 *****************************************
 */
export function updateAppHistory(history) {
    model.history = history;
}


/**
 *****************************************
 * 创建路由代理
 *****************************************
 */
function createRouterProxy(router) {
    return {
        get action() {
            return router.props.$router.action;
        },
        get method() {
            return router.props.$router.method;
        },
        get pathname() {
            return router.props.$router.pathname;
        },
        get histories() {
            return router.props.$router.histories;
        },
        get length() {
            return router.props.$router.histories.length;
        },
        get context() {
            return router.context.router.pathname;
        },
        get otherwise() {
            return router.context.router.otherwise;
        }
    };
}


/**
 ************************************
 * 跳转到路径
 ************************************
 */
function pushState(router, resolve) {
    return function push(path, { method = 'PUSH' } = {}) {

        // 校验路径
        if (isString(path)) {

            // 解析路径
            path = resolve(path);

            // 跳转路径
            if (path !== router.pathname) {
                model.history.push(path, { method });
            }
        }
    };
}


/**
 *************************************
 * 替换路径
 *************************************
 */
function replaceState(router, resolve) {
    return function replace(path, { method = 'REPLACE' } = {}) {

        // 校验路径
        if (isString(path)) {

            // 解析路径
            path = resolve(path);

            // 跳转路径
            if (path !== router.pathname) {
                model.history.replace(path, { method });
            }
        }
    };
}



/**
 *************************************
 * 返回路径
 *************************************
 */
function popState(router, resolve) {
    return function pop(step = -1) {
        let type = validate(step, 'number', 'string');

        // 无效参数
        if (!step) {
            return false;
        }

        // 指定步数跳转
        if (type === 'number') {
            let len = router.length,
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
            return history.go(idx < 0 ? 1 - len : step);
        }

        // 指定路径
        if (type === 'string') {
            let path = resolve(step),
                idx;

            // 无需跳转
            if (path === router.pathname) {
                return false;
            }

            // 获取路径位置
            idx = router.histories.lastIndexOf(path);

            // 找不到返回路径
            if (idx === -1) {

                // 跳转路由
                return history.replace(path, { method: 'POP' });
            }

            // 跳转路由
            return history.go(idx - router.histories.length + 1);
        }
    };
}


/**
 *****************************************
 * 解析路过
 *****************************************
 */
function resolvePath(router) {

    // 返回解析函数
    return (...args) => {
        let context = router.context || '/',
            path = args.reduce((str, curr) => {

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
