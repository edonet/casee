/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-07 16:42:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { matchPath } from 'react-router';
import { resolvePath } from '../../app-router/history';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const
    model = {
        level: 0, leave: null, enter: null, method: 'REPLACE', count: 0
    };


/**
 *****************************************
 * 匹配路由状态
 *****************************************
 */
export default function matchState(router) {
    return function match(url, callback) {
        let {
                pathname, method, context = '/',
                resolve = resolvePath(context)
            } = router,
            path = resolve(url || './:__404__'),
            matched = null;


        // 匹配非【404】以下的路由
        if (!context.endsWith('/:__404__')) {
            matched = matchPath(pathname, { path });
        }

        // 处理匹配成功
        if (matched) {
            let level = (
                    matched.params.__404__ ?
                    context.length :
                    matched.isExact ? Infinity : 0
                );


            // 处理进入页面
            if (level > model.level) {

                // 存在匹配参数
                model.level = level;
                model.method = method;
                model.enter = callback;

            } else if (level) {

                // 取消匹配
                matched = null;
            }
        }

        // 返回匹配结果
        return matched || {
            path, url: '', isExact: false, params: {}
        };
    };
}


/**
 *****************************************
 * 路由更新完成钩子
 *****************************************
 */
export function invokeRouterCallback() {

    // 处理回调
    if (!model.count && model.enter && model.enter !== model.leave) {
        model.enter('enter', model.method);
        model.leave && model.leave('leave', model.method);
    }
}


/**
 *****************************************
 * 重置路由匹配信息
 *****************************************
 */
export function updateAppMatcher() {

    // 重置数据
    model.level = 0;
    model.leave = model.enter;
    model.enter = null;
    model.method = '';
    model.count = 0;

    // 设置更新定时器
    model.timeStamp = setTimeout(invokeRouterCallback);
}


/**
 *****************************************
 * 更新路由标记
 *****************************************
 */
export function stateWillUpdate(path) {

    // 排除【404】路径
    if (path) {
        model.count ++;

        // 清空定时器
        model.timeStamp && clearTimeout(model.timeStamp);
        model.timeStamp = null;
    }
}


/**
 *****************************************
 * 完成路由标记
 *****************************************
 */
export function stateDidUpdate(path) {

    // 排除【404】路径
    if (path) {
        model.count --;
        model.count || invokeRouterCallback();
    }
}
