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

            // 处理路径变化
            switch (action) {
                case 'PUSH':
                    histories = [...histories, pathname];
                    break;
                case 'REPLACE':
                    histories = histories.slice(0, len - 1);
                    histories.push(pathname);
                    break;
                default:
                    (index => {
                        histories = index > 0 ? histories.slice(0, index + 1) : [pathname];
                    })(histories.lastIndexOf(pathname));
                    break;
            }

        } else {

            // 初始化路径
            method = 'REPLACE';
            histories = [...histories, pathname];
        }

        return { action, method, pathname, histories };
    }
});
