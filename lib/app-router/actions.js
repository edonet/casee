/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-24 18:50:07
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { UPDATE_APP_ROUTER } from './actionTypes';


/**
 *****************************************
 * 更新路由信息
 *****************************************
 */
export function updateAppRouter({ history, location }) {

    let { action } = history,
        { pathname } = location,
        { method = action } = resolveSearch(location.search);


    // 返回数据
    return {
        type: UPDATE_APP_ROUTER, data: { action, method, pathname }
    };

}


/**
 *****************************************
 * 解析查询字符串
 *****************************************
 */
export function resolveSearch(search = '?') {
    let data = {};

    // 解析字符串
    search.replace(/^\?/, '').split('&').forEach(str => {
        let [key, value = ''] = str.split('=');

        // 解析键值
        key = decodeURIComponent(key).trim();
        value = value ? decodeURIComponent(value).trim() : true;

        // 添加属性
        data[key] = value;
    });

    // 返回结果
    return data;
}
