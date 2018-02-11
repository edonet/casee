/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 17:07:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import each from './each';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【each】', () => {

    /* 遍历数组 */
    test('遍历数组', () => {
        let cb = jest.fn();

        // 遍历整个数组
        each([1, 2, 3], cb);

        // 校验调用结果
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[0][0]).toBe(0);
        expect(cb.mock.calls[0][1]).toBe(1);
        expect(cb.mock.calls[1][0]).toBe(1);
        expect(cb.mock.calls[1][1]).toBe(2);
        expect(cb.mock.calls[2][0]).toBe(2);
        expect(cb.mock.calls[2][1]).toBe(3);

        // 更新回调
        cb = jest.fn();

        // 遍历整个数组
        each([1, 2, 3], cb, 1);

        // 校验调用结果
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[0][0]).toBe(1);
        expect(cb.mock.calls[0][1]).toBe(2);
        expect(cb.mock.calls[1][0]).toBe(2);
        expect(cb.mock.calls[1][1]).toBe(3);
    });

    /* 中断遍历数组 */
    test('中断遍历数组', () => {
        let cb = jest.fn((idx, val) => val < 2);

        // 遍历整个数组
        each([1, 2, 3], cb);

        // 校验调用结果
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[0][0]).toBe(0);
        expect(cb.mock.calls[0][1]).toBe(1);
        expect(cb.mock.calls[1][0]).toBe(1);
        expect(cb.mock.calls[1][1]).toBe(2);
    });

    /* 遍历对象 */
    test('遍历对象', () => {
        let cb = jest.fn();

        // 遍历整个数组
        each({ a: 1, b: 2, c: 3 }, cb);

        // 校验调用结果
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[0][0]).toBe('a');
        expect(cb.mock.calls[0][1]).toBe(1);
        expect(cb.mock.calls[1][0]).toBe('b');
        expect(cb.mock.calls[1][1]).toBe(2);
        expect(cb.mock.calls[2][0]).toBe('c');
        expect(cb.mock.calls[2][1]).toBe(3);

        // 更新回调
        cb = jest.fn();

        // 遍历整个数组
        each({ a: 1, b: 2, c: 3 }, cb, ['c', 'a']);

        // 校验调用结果
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[0][0]).toBe('c');
        expect(cb.mock.calls[0][1]).toBe(3);
        expect(cb.mock.calls[1][0]).toBe('a');
        expect(cb.mock.calls[1][1]).toBe(1);
    });

    /* 中断遍历对象 */
    test('中断遍历对象', () => {
        let cb = jest.fn(key => key !== 'b');

        // 遍历整个数组
        each({ a: 1, b: 2, c: 3 }, cb);

        // 校验调用结果
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[0][0]).toBe('a');
        expect(cb.mock.calls[0][1]).toBe(1);
        expect(cb.mock.calls[1][0]).toBe('b');
        expect(cb.mock.calls[1][1]).toBe(2);
    });
});
