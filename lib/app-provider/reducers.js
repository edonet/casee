/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-30 00:12:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createReducer } from 'selector';
import { UPDATE_APP_DEVICE } from './actions';
import { reducers as routerReducers } from '../app-router';



/**
 *****************************************
 * 加载解析器
 *****************************************
 */
const model = {
    reducers: {
        version: () => 'v0.0.1',
        $device: createReducer({ type: UPDATE_APP_DEVICE }),
        ...routerReducers
    }
};


/**
 *****************************************
 * 生成解析器
 *****************************************
 */
export default model.reducers;


/**
 *****************************************
 * 合并解析器
 *****************************************
 */
export function updateAppReducers(reducers) {
    return model.reducers = { ...model.reducers, reducers };
}
