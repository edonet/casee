/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-24 23:32:00
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createReducer } from 'selector';
import { UPDATE_APP_ROUTER } from '../actions/types';


/**
 *****************************************
 * 更新路由信息
 *****************************************
 */
export const $router = createReducer({
    type: UPDATE_APP_ROUTER,
    state: {
        action: '', method: '', pathname: '', histories: []
    }
});
