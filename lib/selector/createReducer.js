/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-23 09:28:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建解析器
 *****************************************
 */
export default function createReducer(type, initState = null) {
    return (state = initState, action) => {

        // 更新数据
        if (type === action.type && isStateChange(action.data, state)) {
            return { ...state, ...action.data };
        }

        // 保持不变
        return state;
    };
}


/**
 *****************************************
 * 定义状态是否变更
 *****************************************
 */
function isStateChange(data, state) {

    // 比较数据变更
    for (let key of Object.keys(data)) {
        if (data[key] !== state[key]) {
            return true;
        }
    }

    return false;
}
