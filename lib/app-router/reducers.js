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
import history from '../history';
import { UPDATE_APP_ROUTER } from './actions';


/**
 *****************************************
 * 创建更新器
 *****************************************
 */
export const $router = (state, { type }) => {

    // 更新路由
    if (type === UPDATE_APP_ROUTER || !state) {
        return {
            method: history.method,
            pathname: history.pathname,
            histories: history.histories,
            length: history.length
        };
    }

    // 返回状态
    return state;
};

