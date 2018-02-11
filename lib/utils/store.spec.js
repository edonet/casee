/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 09:25:34
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import createStore from './store';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【store】', () => {
    test('创建【store】', () => {
        let store = createStore(),
            state = store.getState(),
            fn = jest.fn();

        // 监听更新
        store.subscribe(fn);

        // 更新数据
        store.setState({ a: 1 });

        // 校验结果
        expect(store.getState()).not.toBe(state);
        expect(store.getState()).toEqual({ a: 1 });

        // 更新数据
        state = store.getState();
        store.setState({ a: 1 });

        // 校验结果
        expect(store.getState()).toBe(state);
        expect(store.getState()).toEqual({ a: 1 });

        // 更新数据
        store.setState(1);
        store.setState({ b: 2 });

        // 检验结果
        expect(store.getState()).toEqual({ a: 1, b: 2 });

        // 校验回调
        expect(fn.mock.calls).toHaveLength(2);
        expect(fn.mock.calls[0][0]).toEqual({ a: 1 });
        expect(fn.mock.calls[1][0]).toEqual({ a: 1, b: 2 });
    });
});
