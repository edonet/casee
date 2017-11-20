/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-20 11:12:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { UPDATE_APP_HISTORY } from '../actions/types';


/**
 *****************************************
 * 更新历史记录
 *****************************************
 */
export const $history = (
    state = {
        action: '',
        method: '',
        pathname: '',
        histories: []
    },
    { type, data }
) => (
    type === UPDATE_APP_HISTORY ? { ...state, ...data } : state
);
