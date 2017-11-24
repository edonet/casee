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
export default function createReducer(options) {
    let {
            type: reducerType,
            state: initState = null,
            reducer = reduceState
        } = options;


    // 返回解析器
    return (state = initState, { type, data }) => {

        // 更新数据
        if (type === reducerType && isStateChange(state, data)) {
            return reducer(state, data);
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
function isStateChange(state, data) {

    // 比较数据变更
    for (let key of Object.keys(data)) {
        if (data[key] !== state[key]) {
            return true;
        }
    }

    return false;
}


/**
 *****************************************
 * 合并状态
 *****************************************
 */
function reduceState(state, data) {
    return { ...state, ...data };
}
