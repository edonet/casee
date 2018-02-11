/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-08 14:28:20
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import delay from './delay';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【delay】', () => {
    test('延时执行', async () => {
        let t = + new Date(),
            fn = jest.fn();

        // 延时
        await delay(100);

        // 校验结果
        expect(new Date - t).toBeGreaterThanOrEqual(100);

        // 延时调用
        await delay(300, fn);

        // 校验结果
        expect(new Date - t).toBeGreaterThanOrEqual(400);
        expect(fn.mock.calls).toHaveLength(1);
    });
});
