/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-31 15:47:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createStore from './store';



/**
 *****************************************
 * 测试【store】
 *****************************************
 */
describe('测试【store】', () => {
    let reducers = { visibilityFilter, todos },
        store,
        dispatch;

    /* 测试前创建【store】 */
    beforeEach(() => {
        store = createStore(reducers);
        dispatch = store.dispatch;
    });


    /* 创建【store】 */
    test('创建【store】', () => {
        let state = store.getState();

        // 初始化【todos】长度应该为【0】
        expect(state.todos.length).toBe(0);

        // 初始化【visibilityFilter】应该为【SHOW_ALL】
        expect(state.visibilityFilter).toBe('SHOW_ALL');
    });


    /* 派发【action】 */
    test('派发【action】', () => {
        let action = { type: 'ADD_TODO', text: '第一项' },
            state;

        // 派发无效行为
        expect(dispatch(null)).toBeNull();

        // 派发正常行为
        expect(dispatch(action)).toEqual(action);

        // 获取状态
        state = store.getState();

        // 校验【todos】长度应该为【1】
        expect(state.todos.length).toBe(1);
        expect(state.todos[0].text).toBe(action.text);

        // 派发异步行为
        return (
            dispatch(new Promise(resolve => {
                setTimeout(() => resolve({ type: 'ADD_TODO', text: '第二项' }), 10);
            }))
            .then(action => {

                // 获取状态
                state = store.getState();

                // 校验【todos】长度应该为【1】
                expect(state.todos.length).toBe(2);
                expect(state.todos[1].text).toBe(action.text);
            })
        );
    });


    /* 更新【store】 */
    test('更新【store】', () => {
        let state;

        // 添加【todo】项目
        dispatch({
            type: 'ADD_TODO',
            text: '第一项'
        });

        // 获取状态
        state = store.getState();

        // 校验【todos】长度应该为【1】
        expect(state.todos.length).toBe(1);

        // 校验【todos】第一项
        expect(state.todos[0]).toEqual({
            text: '第一项',
            completed: false
        });

        // 完成【todo】项目
        dispatch({
            type: 'COMPLETE_TODO',
            index: 0
        });

        // 获取状态
        state = store.getState();

        // 校验完成项目
        expect(state.todos[0]).toEqual({
            text: '第一项',
            completed: true
        });
    });


    /* 测试监听【store】更新 */
    test('测试监听【store】更新', () => {
        let count = 0,
            state,
            unsubscribe;

        // 监听事件更新
        unsubscribe = store.subscribe(() => {
            count ++;
        });

        // 添加【todo】项目
        dispatch({
            type: 'ADD_TODO',
            text: '第一项'
        });

        // 添加【todo】项目
        dispatch({
            type: 'ADD_TODO',
            text: '第二项'
        });

        // 完成【todo】项目
        dispatch({
            type: 'COMPLETE_TODO',
            index: 0
        });

        // 取消监听
        unsubscribe();

        // 更新过滤
        dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: 'SHOW_COMPLETED'
        });

        // 获取状态
        state = store.getState();

        // 判断计数为【3】
        expect(count).toBe(3);

        // 判断过滤器为【SHOW_COMPLETED】
        expect(state.visibilityFilter).toBe('SHOW_COMPLETED');
    });

    /* 测试更新【reducer】 */
    test('测试更新【reducer】', () => {
        let state;

        // 更新【reducer】
        store.replaceReducer({ version: () => 'v0.1.0'});

        // 获取状态
        state = store.getState();

        // 校验新的【version】
        expect(state.version).toBe('v0.1.0');

        // 校验【visibilityFilter】
        expect(state.visibilityFilter).toBe('SHOW_ALL');
    });
});



/**
 *****************************************
 * visibilityFilter reducer
 *****************************************
 */
function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}



/**
 *****************************************
 * todos reducer
 *****************************************
 */
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if (index === action.index) {
                    return {
                        ...todo,
                        completed: true
                    };
                }
                return todo;
            });
        default:
            return state;
    }
}
