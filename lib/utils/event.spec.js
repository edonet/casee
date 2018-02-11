/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-08 16:04:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import EventEmitter from './event';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【event】', () => {
    test('测试【EventEmitter】', () => {
        let f1 = jest.fn(),
            f2 = jest.fn(),
            f3 = jest.fn(),
            ev = new EventEmitter();

        // 添加事件
        ev.on('test', f1);
        ev.once('test', f2);
        ev.on('$emit', f3);

        // 执行事件
        ev.emit('test', 1);
        ev.emit('test', 2);

        // 移除事件
        ev.off('test', f1);

        // 执行事件
        ev.emit('test', 3);

        // 校验结果
        expect(f1.mock.calls).toHaveLength(2);
        expect(f2.mock.calls).toHaveLength(1);
        expect(f3.mock.calls).toHaveLength(3);
        expect(f1.mock.calls[0][0]).toBe(1);
        expect(f1.mock.calls[1][0]).toBe(2);
        expect(f2.mock.calls[0][0]).toBe(1);
        expect(f3.mock.calls[0]).toEqual(['test', 1]);
        expect(f3.mock.calls[1]).toEqual(['test', 2]);
        expect(f3.mock.calls[2]).toEqual(['test', 3]);
    });
});
