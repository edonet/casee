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

    /* 测试自动节流 */
    test('测试自动节流', async () => {
        let fn = jest.fn(),
            leading = throttle(null, true),
            trailing = throttle();

        // 执行回调
        for (let i = 0; i < 10; i ++) {
            leading(() => fn(i));
            trailing(() => fn(i));
        }

        // 延时
        await delay(100);

        // 执行回调
        for (let i = 10; i < 20; i++) {
            leading(() => fn(i));
            trailing(() => fn(i));
        }

        // 延时
        await delay(20);

        // 校验结果
        expect(fn.mock.calls).toHaveLength(4);
        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[1][0]).toBe(9);
        expect(fn.mock.calls[2][0]).toBe(10);
        expect(fn.mock.calls[3][0]).toBe(19);
    });

    /* 定时节流 */
    test('定时节流', async () => {
        let fn = jest.fn(),
            leading = throttle(50, true),
            trailing = throttle(50);

        // 执行回调
        for (let i = 0; i < 10; i++) {
            leading(() => fn(i));
            trailing(() => fn(i));
            await delay(10);
        }

        // 校验结果
        expect(fn.mock.calls).toHaveLength(4);
        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[1][0]).toBe(4);
        expect(fn.mock.calls[2][0]).toBe(5);
        expect(fn.mock.calls[3][0]).toBe(9);
    });
});
