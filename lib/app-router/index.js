/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 10:10:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import history from '../history';
import createRouter, { createRoute } from './router';
import { updateAppRouter } from './actions';
import * as reducers from './reducers';


/**
 *****************************************
 * 监听路由变化
 *****************************************
 */
history.subscribe(updateAppRouter);


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default createRouter;
export { reducers, createRoute };
