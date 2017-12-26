/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 23:05:02
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载解析器
 *****************************************
 */
import { reducers as providerReducers } from './app-provider';
import { reducers as routerReducers } from './app-router';


/**
 *****************************************
 * 生成解析器
 *****************************************
 */
export default {
    version: () => 'v0.1.0',
    ...providerReducers,
    ...routerReducers
};
