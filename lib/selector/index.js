/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 14:31:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { connect } from 'react-redux';
import { initSelector, dispatch, mapSelector } from './model';
import createReducer from './createReducer';


/**
 *****************************************
 * 使用选择器
 *****************************************
 */
export default function selector(...args) {
    return connect(...mapSelector(...args));
}


/**
 *****************************************
 * 初始化选择器
 *****************************************
 */
export { initSelector, dispatch, createReducer };
