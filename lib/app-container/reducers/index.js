/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 12:40:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { UPDATE_DEVICE_INFO } from '../actions/types';
import plotform from './plotform';


/**
 *****************************************
 * 更新设置信息
 *****************************************
 */
export const $device = (
    state = {
        status: 'loading',
        plotform: plotform(),
        width: window.innerWidth,
        height: window.innerHeight
    },
    { type, data }
) => (
    type === UPDATE_DEVICE_INFO ? { ...state, ...data } : state
);

