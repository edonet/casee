/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 19:31:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { dispatch } from '../selector';
import createHistory from './model';
import updateAppHistory from './actions';


/**
 *****************************************
 * 创建历史对象
 *****************************************
 */
const { subscribe } = createHistory();


/**
 *****************************************
 * 监听历史记录改变
 *****************************************
 */
subscribe(data => dispatch(updateAppHistory(data)));
