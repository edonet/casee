/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-05 19:49:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import capture, { bind, inject } from './EventPluginRegistry';
import TouchEventPlugin from './TouchEventPlugin';


/**
 *****************************************
 * 注册事件
 *****************************************
 */
inject(TouchEventPlugin);


/**
 *****************************************
 * 创建事件插件
 *****************************************
 */
export default capture;
export { bind as bindEvent };

