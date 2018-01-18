/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 16:00:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createReducer } from 'selector';
import { UPDATE_APP_ROUTER } from './actionTypes';
import model from './model';


/**
 *****************************************
 * 更新路由信息
 *****************************************
 */
export const $router = createReducer({
    type: UPDATE_APP_ROUTER,
    state: {
        method: model.method,
        pathname: model.pathname,
        histories: model.histories,
        length: model.histories.length
    }
});
