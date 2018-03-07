/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-05 19:57:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import createEvent, { SyntheticEvent } from './SyntheticEvent';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【SyntheticEvent】', () => {

    /* 测试阻止默认行为 */
    test('测试阻止默认行为', () => {
        let event = new SyntheticEvent();

        // 校验属性
        expect(event.type).toBe('syntheticEvent');
        expect(event.isDefaultPrevented()).toBeFalsy();

        // 阻止行为
        event.preventDefault();

        // 校验结果
        expect(event.type).toBe('syntheticEvent');
        expect(event.isDefaultPrevented()).toBeTruthy();
    });

    /* 测试阻止冒泡 */
    test('测试阻止冒泡', () => {
        let event = new SyntheticEvent('tap');

        // 校验结果
        expect(event.type).toBe('tap');
        expect(event.isPropagationStopped()).toBeFalsy();

        // 阻止冒泡
        event.stopPropagation();

        // 校验结果
        expect(event.type).toBe('tap');
        expect(event.isPropagationStopped()).toBeTruthy();
    });

    /* 测试创建属性 */
    test('测试创建属性', () => {
        let event = createEvent('tap', {
            x: 1,
            y: 2,
            stringify() { return `${this.type}: ${this.x}, ${this.y}`; }
        });

        // 校验属性
        expect(event.type).toBe('tap');
        expect(event.x).toBe(1);

        // 修改属性
        expect(() => event.type = 'modify').toThrowError();

        // 校验结果
        expect(event.type).toBe('tap');
        expect(event.stringify()).toBe('tap: 1, 2');
    });
});
