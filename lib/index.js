/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-29 17:34:02
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载组件
 *****************************************
 */
import style from './style';
import selector from './selector';
import mount, { unmount } from './app-provider';
import AppContainer from './app-container';
import AppView from './app-view';
import AppLink from './app-link';
import AppIcon from './app-icon';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default mount;
export { AppContainer, AppView, AppLink, AppIcon };
export { unmount, style, selector };
