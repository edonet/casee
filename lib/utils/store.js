/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 09:17:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import contain from './contain';
import observer from './observer';
import { isObject } from './validate';


/**
 *****************************************
 * 创建数据仓储
 *****************************************
 */
export default function createStore() {
    let state = {},
        ob = observer();

    // 更新状态
    function setState(data) {

        // 更新状态
        if (isObject(data) && !contain(state, data)) {
            ob.publish(state = { ...state, ...data });
        }

        // 返回状态
        return state;
    }

    // 返回接口
    return {
        getState: () => state,
        setState: setState,
        subscribe: ob.subscribe
    };
}
