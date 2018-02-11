/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-09 10:50:08
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import promisify from './promisify';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【promisify】', () => {
    test('创建【promise】', async () => {
        let f1 = cb => setTimeout(() => cb(null, 1));

        // 校验结果
        expect(await promisify(1)()).toBe(1);
        expect(await promisify('abc')()).toBe('abc');
        expect(await promisify(f1)()).toBe(1);

        // 校验错误
        await promisify(new TypeError('is error'))().catch(
            err => expect(err).toBeInstanceOf(TypeError)
        );
    });
});
