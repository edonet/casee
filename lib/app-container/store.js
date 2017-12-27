/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 11:40:47
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
import { initSelector } from 'selector';
import reducers from '../reducers.js';


/**
 *****************************************
 * 创建数据仓储
 *****************************************
 */
const model = {
    store: createAppStore(combineReducers(reducers))
};


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default model.store;
export { updateAppStore };


/**
 *****************************************
 * 更新数据仓储
 *****************************************
 */
function updateAppStore(appReducers) {

    // 更新状态树
    model.store.replaceReducer(
        combineReducers({ ...reducers, ...appReducers })
    );
}


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
function createAppStore(appReducers = {}) {
    let middlewares = [thunk],
        store;


    /* 配置开发调试工具 */
    if (process.env.NODE_ENV !== 'production') {

        // 启用【redux】日志
        middlewares.push(require('redux-logger').default);

        // 启用【reducer】纯函数检测
        middlewares.unshift(require('redux-immutable-state-invariant').default());
    }


    /* 创建数据模型 */
    store = createStore(appReducers, {}, compose(

        // 装载中间件
        applyMiddleware(...middlewares),

        // 启用【redux】调试扩展，如果可用
        window && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));

    /* 初始化选择器 */
    return initSelector(store);
}
