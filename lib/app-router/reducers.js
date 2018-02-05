/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 16:52:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createReducer from '../selector';
import { UPDATE_APP_ROUTER } from './actions';


/**
 *****************************************
 * 创建更新器
 *****************************************
 */
export default function makeRouterReducer({ method, pathname, histories, length }) {
    return {
        $router: createReducer({
            type: UPDATE_APP_ROUTER,
            state: { method, pathname, histories, length }
        })
    };
}
