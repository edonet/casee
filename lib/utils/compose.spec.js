/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 17:52:55
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import compose from './compose';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【compose】', () => {

    /* 组合函数 */
    test('组合函数', () => {
        let cb1 = jest.fn(() => 1),
            cb2 = jest.fn(arg => arg + 2),
            add = (a, b) => a + b,
            res;


        // 组合函数
        res = compose(cb1, cb2, cb2, cb1, cb2, add)(6, 5);

        // 校验结果
        expect(res).toBe(1);
        expect(cb1.mock.calls.length).toBe(2);
        expect(cb1.mock.calls[0][0]).toBe(13);
        expect(cb1.mock.calls[1][0]).toBe(5);
        expect(cb2.mock.calls.length).toBe(3);
        expect(cb2.mock.calls[0][0]).toBe(11);
        expect(cb2.mock.calls[1][0]).toBe(1);
        expect(cb2.mock.calls[2][0]).toBe(3);
    });
});
