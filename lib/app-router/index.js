/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 16:42:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import history from '../history';
import { updateAppRouter } from './actions';
import initReducer from './reducers';


/**
 *****************************************
 * 监听路由变化
 *****************************************
 */
history.subscribe(updateAppRouter);


/**
 *****************************************
 * 路由更新器
 *****************************************
 */
export const reducers = initReducer(history);
