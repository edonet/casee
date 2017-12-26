/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 17:25:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { updateRouterState } from '../history';


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
export default function createHistory(context) {

    // 判断缓存是否可用
    if (!(context in model)) {
        let resolve = resolvePath(context);

        // 生成对象
        model[context] = {
            resolve
        };
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
