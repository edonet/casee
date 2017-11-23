/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-23 16:40:40
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import history from './actions';


/**
 *****************************************
 *  路由确认函数
 *****************************************
 */
export default function routeConfirmation(message, callback) {
    console.log(history);
    callback(true);
}
