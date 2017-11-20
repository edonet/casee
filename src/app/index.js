/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-13 15:05:41
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import * as style from 'style';
import { AppTap } from 'sigo';

console.log(style);


/**
 *****************************************
 * 定义组件
 *****************************************
 */
export default function App() {
    return (
        <AppTap className="app">Hello Orchid! @:@!</AppTap>
    );
}
