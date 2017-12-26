/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-23 09:28:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { assign, contain } from '../utils';


/**
 *****************************************
 * 创建解析器
 *****************************************
 */
export default function createReducer(options) {
    let {
            type: reducerType,
            state: initState = null,
            reducer = assign
        } = options;


    // 返回解析器
    return (state = initState, { type, data }) => {

        // 更新数据
        if (type === reducerType && !contain(state || {}, data)) {
            return reducer(state, data);
        }

        // 保持不变
        return state;
    };
}
