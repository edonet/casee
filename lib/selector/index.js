/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-31 15:38:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { connect } from 'react-redux';
import reducers from '../reducers';
import createStore from './store';
import initSelector from './selector';


/**
 *****************************************
 * 创建数据仓储
 *****************************************
 */
const
    store = createStore(reducers),
    selector = initSelector(store);


/**
 *****************************************
 * 获取选择器
 *****************************************
 */
export default function (...args) {
    return connect(...selector.map(...args));
}


/**
 *****************************************
 * 创建选择器
 *****************************************
 */
export const createSelector = selector.create;


/**
 *****************************************
 * 获取状态仓储
 *****************************************
 */
export const getStore = () => store;


/**
 *****************************************
 * 派发行为
 *****************************************
 */
export const dispatch = store.dispatch;


/**
 *****************************************
 * 获取状态
 *****************************************
 */
export const getState = store.getState;


/**
 *****************************************
 * 监听状态变更
 *****************************************
 */
export const subscribe = store.subscribe;


/**
 *****************************************
 * 更新仓储
 *****************************************
 */
export const updateStore = store.replaceReducer;
