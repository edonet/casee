/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 10:02:39
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import noop from './noop';


/**
 *****************************************
 * 校验模块
 *****************************************
 */
describe('校验【noop】', () => {
    test('测试返回值', () => {
        expect(noop()).toBeUndefined();
        expect(noop(1)).toBe(1);
        expect(noop('1')).toBe('1');
        expect(noop(NaN)).toBe(NaN);
        expect(noop(Infinity)).toBe(Infinity);
        expect(noop(true)).toBe(true);
        expect(noop(false)).toBe(false);
        expect(noop(null)).toBe(null);
        expect(noop(undefined)).toBe(undefined);
    });
});
