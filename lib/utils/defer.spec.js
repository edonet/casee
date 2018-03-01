/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 17:41:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import defer from './defer';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【defer】', () => {
    test('测试延时', async () => {
        let count = 1,
            deferred = defer();

        // 校验结果
        expect(count ++).toBe(1);

        // 延时
        setTimeout(() => {
            expect(count ++).toBe(3);
            deferred.resolve(count);
        }, 100);

        // 校验结果
        expect(count ++).toBe(2);

        // 返回延时对象
        expect(await deferred.promise).toBe(4);
    });
});
