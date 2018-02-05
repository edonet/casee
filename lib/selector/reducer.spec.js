/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-05 17:22:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import createReducer from './reducer';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【createReducer】', () => {

    /* 测试创建【reducer】 */
    test('测试创建【reducer】', () => {
        let type = 'update_data',
            state = { a: 1, b: 2, c: 3 },
            reducer = createReducer({ type, state });

        // 校验更新结果
        expect(reducer()).toBe(state);

        // 更新状态
        state = reducer(state, { type, data: { d: 4 }});

        // 校验更新结果
        expect(state).toEqual({ a: 1, b: 2, c: 3, d: 4 });
        expect(reducer(state, { type })).toBe(state);
        expect(reducer(state, { type, data: { a: 1, c: 3 }})).toBe(state);
    });
});
