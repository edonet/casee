/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 10:53:42
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import queue from './queue';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【queue】', () => {

    /* 测试创建队列 */
    test('测试创建队列', () => {
        let q = queue();

        // 添加元素
        q.enqueue(1, 2, 3);

        // 校验结果
        expect(q.isEmpty()).toBeFalsy();
        expect(q.first()).toBe(1);
        expect(q.last()).toBe(3);
        expect(q).toHaveLength(3);
    });

    /* 测试弹出队列 */
    test('测试弹出队列', () => {
        let q = queue(),
            fn = jest.fn();

        // 添加元素
        q.enqueue(1, 2, 3);

        // 校验结果
        expect(q.dequeue()).toBe(1);
        expect(q).toHaveLength(2);

        // 执行队列
        q.invoke(fn);

        // 校验结果
        expect(fn.mock.calls).toHaveLength(2);
        expect(fn.mock.calls[0][0]).toBe(2);
        expect(fn.mock.calls[1][0]).toBe(3);
        expect(q.dequeue()).toBeUndefined();
        expect(q).toHaveLength(0);
    });
});
