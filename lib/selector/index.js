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
import createStore from './store';
import initSelector from './actions';


/**
 *****************************************
 * 创建数据仓储
 *****************************************
 */
const
    store = createStore({ version: () => '0.1.0' }),
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
 * 派发行为
 *****************************************
 */
export const dispatch = store.dispatch;


/**
 *****************************************
 * 更新仓储
 *****************************************
 */
export const updateStore = store.replaceReducer;
