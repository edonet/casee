/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 14:55:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './app-content';
import style from './style';
import selector from './selector';
import mount, { unmount } from './app-provider';
import AppContainer from './app-container';
import AppView from './app-view';
import AppLink from './app-link';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default mount;
export { unmount, style, selector };
export { AppContainer, AppView, AppLink };
