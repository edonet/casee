/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 17:54:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { rAF, updater, animate } from './animate';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【animate】', () => {

    /* 测试【rAF】 */
    test('测试【rAF】', () => {
        let count = 0,
            defer = new Promise(resolve => rAF(() => resolve(++ count)));

        // 校验结果
        defer.then(() => expect(count).toBe(1));
        expect(count).toBe(0);

        // 异步
        return defer;
    });

    /* 测试【updater】 */
    test('测试【updater】', async () => {
        let update = updater(),
            fn = jest.fn();

        // 执行更新脚本
        for (let i = 0; i < 10; i++) {
            update(() => fn(i));
        }

        // 校验更新结果
        await new Promise(resolve => rAF(resolve));

        // 校验结果
        expect(fn.mock.calls).toHaveLength(1);
        expect(fn.mock.calls[0][0]).toBe(9);
    });

    /* 测试【animate】 */
    test('测试【animate】', async () => {
        let n = + new Date(),
            fn = jest.fn(d => expect(d).toBeLessThan(1));

        // 执行动画
        await new Promise(resolve => {
            animate(300, d => d >= 1 ? resolve() : fn(d));
        });

        // 校验结果
        expect(new Date() - n).toBeGreaterThanOrEqual(300);
    });
});
