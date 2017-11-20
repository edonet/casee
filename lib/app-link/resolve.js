/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-20 09:44:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 解析路径
 *****************************************
 */
export default function resolve(...args) {
    return args.reduce((parent, path) => {

        // 过滤非法参数
        if (!path || typeof path !== 'string') {
            return parent;
        }

        // 返回绝对路径
        if (path[0] === '/') {
            return path;
        }

        // 分割路径
        path = path.split('/');
        parent = parent.split('/');

        // 重组路径
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

        }, parent);

        // 连接路径
        return path.join('/') || '/';
    }, '');
}
