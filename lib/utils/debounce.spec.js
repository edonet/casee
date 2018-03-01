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
        let debounced = debounce(),
            fn = jest.fn();

        // 执行遍历
        for(let i = 0; i < 10; i ++) {
            await delay(5, () => debounced(() => fn(i)));
        }

        // 校验结果
        expect(fn.mock.calls.length).toBeLessThan(5);
        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[1][0]).toBeGreaterThan(0);
        expect(fn.mock.calls[2][0]).toBeGreaterThan(fn.mock.calls[1][0]);
    });

    /* 测试过滤延时抖动 */
    test('测试过滤延时抖动', async () => {
        let debounced = debounce(40),
            fn = jest.fn();

        // 执行遍历
        for (let i = 0; i < 10; i++) {
            await delay(5, () => debounced(() => fn(i)));
        }

        // 校验结果
        expect(fn.mock.calls).toHaveLength(2);
        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[1][0]).toBeGreaterThan(0);
    });
});
