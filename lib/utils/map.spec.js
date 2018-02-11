/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 09:29:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import map from './map';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【map】', () => {

    /* 遍历数组 */
    test('遍历数组', () => {
        let cb = jest.fn(v => v);

        // 遍历数组
        expect(map(cb)([1, 2, 3])).toEqual([1, 2, 3]);
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[0][0]).toBe(1);
        expect(cb.mock.calls[1][0]).toBe(2);
        expect(cb.mock.calls[2][0]).toBe(3);

        // 遍历数字
        expect(map(cb)(1)).toBe(1);
        expect(cb.mock.calls[3][0]).toBe(1);

        // 遍历值
        expect(map(cb)(null)).toBeNull();
        expect(cb.mock.calls[4][0]).toBeNull();
    });

    /* 遍历对象 */
    test('遍历对象', () => {
        let o = {
                map: (c => cb => c = cb(c))(0)
            },
            cb = jest.fn(v => v + 1);

        // 遍历数组
        expect(map(cb)(o)).toEqual(1);
        expect(map(cb)(o)).toEqual(2);
        expect(cb.mock.calls).toHaveLength(2);
    });
});
