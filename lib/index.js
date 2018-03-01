/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 19:28:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import style from './style';
import selector from './selector';
import render, { unmount } from './app-provider';
import AppContainer from './app-container';
import AppView from './app-view';
import AppTouther from './app-toucher';
import AppLink from './app-link';
import AppScroll from './app-scroll';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default render;
export { AppContainer, AppView, AppTouther, AppLink };
export { AppScroll };
export { style, selector, unmount };
