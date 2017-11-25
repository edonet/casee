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
import { UPDATE_APP_ROUTER } from './actionTypes';


/**
 *****************************************
 * 更新路由信息
 *****************************************
 */
export const $router = createReducer({
    type: UPDATE_APP_ROUTER,
    state: {
        action: '', method: '', pathname: '', histories: []
    },
    reducer(state, data) {
        let { histories } = state,
            { action, method, pathname } = data,
            len = histories.length;


        // 处理路由历史
        if (len) {

            // 处理路由行为
            if (action === 'PUSH') {

                // 添加历史记录
                histories = [...histories, pathname];

            } else if (action === 'REPLACE' && method !== 'POP') {

                // 替换路由
                histories = histories.slice(0, len - 1).concat([pathname]);

            } else {

                // 弹出路由
                histories = histories.slice(0, histories.lastIndexOf(pathname) + 1).concat([pathname]);
            }

        } else {

            // 初始化路径
            method = 'REPLACE';
            histories = [...histories, pathname];
        }

        return { action, method, pathname, histories };
    }
});
