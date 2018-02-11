/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-06 16:56:55
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import React from 'react';
import render, { unmount } from './index';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【AppProvider】', () => {

    /* 测试【render】 */
    test('测试【render】', () => {
        let el;

        // 创建元素
        document.body.innerHTML = '<div id="app"></div>';

        // 加载组件
        render(<div id="el">abc</div>, 'app');

        // 获取元素
        el = document.getElementById('el') || null;

        // 校验结果
        expect(el.nodeType).toBe(1);
        expect(el.tagName).toBe('DIV');
        expect(el.innerHTML).toBe('abc');

        // 卸载组件
        unmount('app');

        // 获取元素
        el = document.getElementById('el') || null;

        // 校验结果
        expect(el).toBeNull();
    });
});
