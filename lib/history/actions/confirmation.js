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
import model from './model';


/**
 *****************************************
 *  路由确认函数
 *****************************************
 */
export default function routeConfirmation(message, callback) {
    model.handleBlock ? model.handleBlock(message, callback) : callback();
}

