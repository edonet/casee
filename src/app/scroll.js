/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 14:56:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import { AppScroll } from 'sigo';


/**
 *****************************************
 * 滚动
 *****************************************
 */
export default function Scroll() {
    let item = [],
        style = { height: 50, lineHeight: '50px', color: '#222' },
        options = { startX: 300, startY: 500 };

    for (let idx = 0; idx < 80; idx ++) {
        item.push(
            <div key={ idx } className="tc" style={ style }>{ idx }</div>
        );
    }

    return (
        <AppScroll options={ options }>{ item }</AppScroll>
    );
}
