/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 14:31:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createReducer } from 'selector';
import { UPDATE_APP_DEVICE } from './actionTypes';


/**
 *****************************************
 * 更新设置信息
 *****************************************
 */
export const $device = createReducer({ type: UPDATE_APP_DEVICE });
