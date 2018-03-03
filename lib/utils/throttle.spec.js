/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-08 14:19:09
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import delay from './delay';
import throttle from './throttle';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【throttle】', () => {

    /* 前置帧节流 */
    test('前置帧节流', async () => {
        let fn = jest.fn(),
            throttled = throttle(fn);

        // 执行回调
        for (let i = 0; i < 10; i++) {
            await delay(5, throttled(i));
        }

        // 延时
        await delay(30);

        // 校验结果
        expect(fn.mock.calls.length).toBeGreaterThan(1);
        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[1][0]).toBeGreaterThan(1);
    });

    /* 前置定时节流 */
    test('前置定时节流', async () => {
        let fn = jest.fn(),
            throttled = throttle(fn, 22);

        // 执行回调
        for (let i = 0; i < 10; i++) {
            await delay(5, throttled(i));
        }

        // 延时
        await delay(30);

        // 校验结果
        expect(fn.mock.calls.length).toBeGreaterThan(1);
        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[1][0]).toBeGreaterThanOrEqual(3);
    });

    /* 后置帧节流 */
    test('后置帧节流', async () => {
        let fn = jest.fn(),
            throttled = throttle(fn, 0, { leading: false });

        // 执行回调
        for (let i = 0; i < 10; i++) {
            await delay(5, throttled(i));
        }

        // 延时
        await delay(30);

        // 校验结果
        expect(fn).toHaveBeenCalled();
        expect(fn.mock.calls.length).toBeLessThan(10);
        expect(fn.mock.calls[0][0]).not.toBe(0);
    });

    /* 后置时间节流 */
    test('后置时间节流', async () => {
        let fn = jest.fn(),
            throttled = throttle(fn, 22, { leading: false });

        // 执行回调
        for (let i = 0; i < 10; i++) {
            await delay(5, throttled(i));
        }

        // 延时
        await delay(30);

        // 校验结果
        expect(fn).toHaveBeenCalled();
        expect(fn.mock.calls.length).toBeLessThan(10);
        expect(fn.mock.calls[0][0]).not.toBe(0);
    });
});
