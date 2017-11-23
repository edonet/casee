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
import { AppLink, AppView } from 'sigo';
import About from './about';

console.log(style);


/**
 *****************************************
 * 定义组件
 *****************************************
 */
export default function App({ title = '' }) {
    return (
        <div>
            <AppLink path="./user">Hello Orchid! @:@!</AppLink>
            <AppLink path="./about">Hello Orchid! @:@!</AppLink>
            <AppLink path="./index">Hello Orchid! @:@!</AppLink>
            <AppView title={ title + '/我' } path="./user" component={ About } />
            <AppView title={ title + '/关于' } path="./user" component={ About } />
            <AppView title={ title + '/Index' } path="./index" component={ App } />
            <AppView title={ title + '/404' } component={ About } />
        </div>
    );
}
