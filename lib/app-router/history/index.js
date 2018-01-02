/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 15:47:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import model, { initAppHistory, createAppHistory, subscribe } from './model';
import * as reducers from './reducers';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default model.history;
export {
    reducers, initAppHistory, createAppHistory, subscribe
};
