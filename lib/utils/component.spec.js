/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 14:48:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from './component';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【component】', () => {

    /* 测试【render】 */
    test('测试【render】', () => {
        let r = (
                (...args) => renderer.create(render(...args)).toJSON()
            ),
            eq = (component, { type, props, children }) => {
                type && expect(component.type).toBe(type);
                props && expect(component.props).toEqual(props);
                children && expect(component.children).toEqual(children);
            };


        // 校验子集渲染
        expect(render()).toBeNull();
        expect(render({ children: 'abc' })).toBe('abc');
        expect(render({ children: true })).toBeTruthy();
        expect(render({ children: <div /> }).type).toBe('div');

        // 校验函数渲染
        expect(render({ render: props => props.count + 1 }, { count: 2 })).toBe(3);
        expect(render({ component: props => props.count + 1 }, { count: 2 })).toBe(3);
        expect(render({ children: props => props.count + 1 }, { count: 2 })).toBe(3);

        // 校验组件渲染
        eq(r({ render: 'div', children: 123 }), { type: 'div', children: ['123'] });
        eq(r({ component: 'div', children: 123 }), { type: 'div', children: ['123'] });
        eq(r({ render: 'div' }, { count: 1 }), { type: 'div', props: { count: 1 } });
        eq(r({ component: 'div' }, { count: 1 }), { type: 'div', props: { count: 1 } });
        eq(r({ render: 'div', children: 123 }, { count: 1 }), { type: 'div', props: { count: 1 }, children: ['123'] });
        eq(r({ component: 'div', children: 123 }, { count: 1 }), { type: 'div', props: { count: 1 }, children: ['123'] });
    });
});
