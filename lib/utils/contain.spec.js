/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 18:03:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import contain from './contain';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【contain】', () => {

    /* 测试包含对象 */
    test('测试包含对象', () => {
        let a = { a: 1, b: 2, c: 3 },
            b = { a: 1, b: 2 },
            c = { c: 3, d: 4 };

        // 校验结果
        expect(contain(a, b)).toBeTruthy();
        expect(contain(a, c)).toBeFalsy();
        expect(contain(a, c, ['c'])).toBeTruthy();
        expect(contain(b, a)).toBeFalsy();
        expect(contain(b, a, ['a', 'b'])).toBeTruthy();
        expect(contain(b, a, ['d'])).toBeFalsy();
    });

    /* 测试包含数组 */
    test('测试包含数组', () => {
        let a = [1, 2, 3],
            b = [1, 2],
            c = [3, 4];

        // 校验结果
        expect(contain(a, b)).toBeTruthy();
        expect(contain(a, c)).toBeFalsy();
        expect(contain(a, c, [3])).toBeTruthy();
        expect(contain(b, a)).toBeFalsy();
        expect(contain(b, a, [1, 2])).toBeTruthy();
        expect(contain(b, a, [3])).toBeFalsy();
    });
});
