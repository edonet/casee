/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 17:03:09
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import contain from '../utils/contain';


/**
 *****************************************
 * 创建更新器
 *****************************************
 */
export default function createReducer({ type: actionType, state: initState = {} }) {
    return (state = initState, { type, data } = {}) => (
        actionType === type && data && !contain(state, data) ? { ...state, ...data } : state
    );
}
