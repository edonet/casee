/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-01 15:46:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import delay from './delay';
import debounce from './debounce';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【debounce】', () => {

    /* 测试过滤帧抖动 */
    test('测试过滤帧抖动', async () => {
        let fn = jest.fn(),
            debounced = debounce(fn);

        // 执行遍历
        for(let i = 0; i < 10; i ++) {
            await delay(5, () => debounced(i));
        }

        // 等待完成
        await delay(30);

        // 校验结果
        expect(fn.mock.calls).toHaveLength(1);
        expect(fn.mock.calls[0][0]).toBe(9);
    });

    /* 测试过滤延时抖动 */
    test('测试过滤延时抖动', async () => {
        let fn = jest.fn(),
            debounced = debounce(fn, 25);

        // 执行遍历
        for (let i = 0; i < 10; i++) {
            await delay(20, () => debounced(i));
        }

        // 等待完成
        await delay(30);

        // 校验结果
        expect(fn.mock.calls).toHaveLength(1);
        expect(fn.mock.calls[0][0]).toBe(9);
    });

    /* 测试过滤前置延时抖动 */
    test('测试过滤前置延时抖动', async () => {
        let fn = jest.fn(),
            debounced = debounce(fn, 25, { leading: true });

        // 执行遍历
        for (let i = 0; i < 10; i++) {
            await delay(20, () => debounced(i));
        }

        // 等待完成
        await delay(30);

        // 校验结果
        expect(fn.mock.calls).toHaveLength(1);
        expect(fn.mock.calls[0][0]).toBe(0);
    });

    /* 测试取消过滤抖动 */
    test('测试取消过滤抖动', async () => {
        let fn = jest.fn(),
            debounced = debounce(fn);

        // 执行遍历
        for (let i = 0; i < 10; i++) {
            await delay(5, () => debounced(i));
        }

        // 取消回调
        debounced.cancel();

        // 等待完成
        await delay(30);

        // 校验结果
        expect(fn.mock.calls).toHaveLength(0);
    });
});
