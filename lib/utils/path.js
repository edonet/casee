/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 14:16:47
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 解析路径
 *****************************************
 */
export function resolve(...args) {
    let path = '.',
        idx = 0;

    // 过滤元效参数
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
    }, path);

    // 解析路径层级
    path = path.split('/').reduce((arr, curr) => {

        if (curr === '.' || !curr) {
            return arr;
        }

        if (curr === '..') {
            idx > 0 && arr.pop();
            idx --;
        } else {
            idx >= 0 && arr.push(curr);
            idx ++;
        }

        return arr;
    }, []).join('/');

    // 返回结果
    return path[0] === '/' ? path : '/' + path;
}
