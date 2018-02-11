/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-10 15:47:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import React from 'react';
import { mount } from 'enzyme';
import history from '../history';
import AppLink from './index';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【app-link】', () => {

    /* 跳转路径 */
    test('测试【AppLink: go】', () => {
        let fn = jest.fn(),
            len = history.length,
            a = mount(
                <AppLink to="./index" onTap={ fn }>app-link</AppLink>
            ).find('a');


        // 模拟触控
        a.simulate('touchstart', touches([0, 0]));
        a.simulate('touchend', touches([0, 0]));

        // 校验结果
        expect(history.pathname).toBe('/index');
        expect(history).toHaveLength(len + 1);
        expect(fn.mock.calls).toHaveLength(1);
    });

    /* 替换路径 */
    test('测试【AppLink: replace】', () => {
        let fn = jest.fn(),
            len = history.length,
            a = mount(
                <AppLink to="./about" onTap={ fn } replace>app-link</AppLink>
            ).find('a');


        // 模拟触控
        a.simulate('touchstart', touches([0, 0]));
        a.simulate('touchend', touches([0, 0]));

        // 校验结果
        expect(history.pathname).toBe('/about');
        expect(history).toHaveLength(len);
        expect(fn.mock.calls).toHaveLength(1);
    });

    /* 返回路径 */
    test('测试【AppLink: goBack】', () => {
        let fn = jest.fn(),
            len = history.length,
            a = mount(
                <AppLink onTap={fn} goBack>app-link</AppLink>
            ).find('a');


        // 模拟触控
        a.simulate('touchstart', touches([0, 0]));
        a.simulate('touchend', touches([0, 0]));

        // 校验结果
        expect(history.pathname).toBe('/');
        expect(history).toHaveLength(len - 1);
        expect(fn.mock.calls).toHaveLength(1);

        // 返回到指定路径
        a = mount(
            <AppLink to="./spec" onTap={ fn } goBack>app-link</AppLink>
        ).find('a');

        // 模拟触控
        a.simulate('touchstart', touches([0, 0]));
        a.simulate('touchend', touches([0, 0]));

        // 校验结果
        expect(history.pathname).toBe('/spec');
        expect(history).toHaveLength(len - 1);
        expect(fn.mock.calls).toHaveLength(2);
    });

    /* 阻止路径跳转 */
    test('测试【AppLink: preventDefault】', () => {
        let fn = jest.fn(e => e.preventDefault()),
            path = history.pathname,
            a = mount(
                <AppLink to={ path + '/about' } onTap={ fn }>app-link</AppLink>
            ).find('a');


        // 模拟触控
        a.simulate('touchstart', touches([0, 0]));
        a.simulate('touchend', touches([0, 0]));

        // 校验结果
        expect(history.pathname).toBe(path);
        expect(fn.mock.calls).toHaveLength(1);
    });
});


/**
 *****************************************
 * 生成触控点位
 *****************************************
 */
function touches(...args) {
    return {
        touches: args.map(([pageX, pageY]) => ({ pageX, pageY }))
    };
}
