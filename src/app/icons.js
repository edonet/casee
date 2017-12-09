/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-09 17:32:26
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import AppIcon, { keys } from 'sigo/app-icon';


/**
 *****************************************
 * 图标列表
 *****************************************
 */
export default function Icons() {

    return (
        <div>
            { keys().map(name => <AppIcon key={ name } name={ name } />) }
        </div>
    );
}
