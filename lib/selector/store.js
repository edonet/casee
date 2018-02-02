/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-31 15:41:07
 *****************************************
 */
'use strict';



/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
export default function createAppStore(reducers = {}) {
    let middlewares = [thunk],
        store;

    /* 配置开发调试工具 */
    if (process.env.NODE_ENV === 'development') {

        // 启用【redux】日志
        middlewares.push(require('redux-logger').default);

        // 启用【reducer】纯函数检测
        middlewares.unshift(require('redux-immutable-state-invariant').default());
    }

    /* 创建数据模型 */
    store = createStore(combineReducers(reducers), {}, compose(

        // 装载中间件
        applyMiddleware(...middlewares),

        // 启用【redux】调试扩展，如果可用
        window && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));

    /* 返回接口 */
    return {
        dispatch: dispatchAction(store),
        replaceReducer: updateReducer(store, reducers),
        getState: () => store.getState(),
        subscribe: cb => store.subscribe(cb)
    };
}


/**
 *****************************************
 * 更新【reducers】
 *****************************************
 */
function updateReducer(store, appReducers = {}) {
    return function update(reducers) {

        // 合并【reducers】
        if (typeof reducers === 'object') {
            appReducers = { ...appReducers, ...reducers };
            reducers = combineReducers(appReducers);
        }

        // 替换【reducers】
        store.replaceReducer(reducers);

        // 返回【store】
        return store;
    };
}


/**
 *****************************************
 * 派发行为
 *****************************************
 */
function dispatchAction(store) {
    return function dispatch(action) {

        // 过滤无效的行为
        if (!action || typeof action !== 'object') {
            return action;
        }

        // 处理同步行为
        if ('type' in action) {
            return store.dispatch(action);
        }

        // 处理异步行为
        if (typeof action.then === 'function') {
            return action.then(dispatch);
        }

        // 返回原对象
        return action;
    };
}

