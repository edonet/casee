/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 10:24:24
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import uuid from '../utils/uuid';
import { resolve, match } from '../utils/path';
import { rAF } from '../utils/animate';
import history from '../history';


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
const model = {
    matched: false, route: null, map: new Map(), task: new Set(), otherwise: []
};


/**
 *****************************************
 * 监听路由变化
 *****************************************
 */
history.subscribe(() => {

    // 创建事务
    model.task = new Set(model.map.keys());

    // 重置属性
    model.matched = null;
    model.otherwise = [];
});


/**
 *****************************************
 * 重置路由
 *****************************************
 */
export default function createRouter() {
    model.matched = false;
    model.route = null;
    model.map = new Map();
    model.task = new Set();
    model.otherwise = [];
}


/**
 *****************************************
 * 创建路由
 *****************************************
 */
export function createRoute() {
    let route = {
            id: uuid(), path: '', context: '/', matched: false, callback: null
        };

    // 添加路由
    appendRoute(route);

    // 返回接口
    return {
        match: state => matchRoute(route, state),
        resolve: () => resolveRoute(route),
        destroy: () => removeRoute(route)
    };
}


/**
 *****************************************
 * 添加路由
 *****************************************
 */
function appendRoute(route) {
    model.map.set(route.id, route);
    model.task.add(route.id);
}


/**
 *****************************************
 * 移除路由
 *****************************************
 */
function removeRoute(route) {
    model.map.delete(route.id);
    model.task.delete(route.id);
}


/**
 *****************************************
 * 匹配路由
 *****************************************
 */
function matchRoute(route, { path, context, callback }) {
    let state;

    // 更新路由
    route.path = resolve(context, path || '__404__');
    route.context = context;
    route.callback = callback;

    // 过滤【404】路由
    if (!path) {

        // 添加【404】路由
        model.otherwise.push(route);

        // 更新状态
        return { path: route.path, matched: false };
    }

    // 过滤【404】以下的路由
    if (context.endsWith('/__404__')) {
        return { path: route.path, matched: false };
    }

    // 解析路径
    state = match(history.pathname, route.path);

    // 处理完成匹配
    if (state.isExact) {
        model.matched ? (state.matched = false) : switchRoute(route);
    }

    // 返回状态
    return state;
}


/**
 *****************************************
 * 解析路由
 *****************************************
 */
function resolveRoute(route) {

    // 移除事务
    model.task.delete(route.id);

    // 更新【404】
    model.matched || model.task.size || resolveOtherwise(model);
}


/**
 *****************************************
 * 切换路由
 *****************************************
 */
function switchRoute(route) {

    // 切换路由
    invokeRouteCallback(model.route, route);

    // 更新状态
    model.route = route;
    model.matched = true;
}


/**
 *****************************************
 * 执行路由回调
 *****************************************
 */
function invokeRouteCallback(curr, next) {
    rAF(() => {
        curr && curr.callback('LEAVE', history);
        next.callback('ENTER', history);
    });
}


/**
 *****************************************
 * 更新【404】路由
 *****************************************
 */
function resolveOtherwise(model) {
    let matched = '',
        matchedRoute = null;

    // 查找匹配的路径
    model.otherwise.forEach(route => {
        let context = route.context;

        // 拼接路径
        if (context !== '/') {
            context += '/';
        }

        // 查找路由
        if (history.pathname.startsWith(context) && context.length > matched) {
            matched = route.context;
            matchedRoute = route;
        }
    });

    // 更新路由
    matchedRoute && switchRoute(matchedRoute);
}
