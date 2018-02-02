/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 16:03:00
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createStore from './store';
import initSelector from './actions';


/**
 *****************************************
 * 测试选择器
 *****************************************
 */
describe('测试【selector】', () => {
    let store, selector, dispatch;

    /* 测试前执行 */
    beforeEach(() => {
        store = createStore({ visibilityFilter, todos });

        // 获取派发器
        dispatch = store.dispatch;

        // 添加项目
        dispatch({ type: 'ADD_TODO', text: '第一项' });
        dispatch({ type: 'ADD_TODO', text: '第二项' });
        dispatch({ type: 'ADD_TODO', text: '第三项' });
        dispatch({ type: 'ADD_TODO', text: '第四项' });
        dispatch({ type: 'ADD_TODO', text: '第五项' });

        // 初始化选择器
        selector = initSelector(store);
    });

    /* 测试创建【selector】 */
    test('测试创建【selector】', () => {
        let todos = selector.get('todos');

        // 完成项目
        dispatch({ type: 'COMPLETE_TODO', index: 0 });
        dispatch({ type: 'COMPLETE_TODO', index: 4 });

        // 创建选择器
        selector.create('showCompleted', use => use('todos').filter(todo => todo.completed));
        selector.create('showUncompleted', use => use('todos').filter(todo => !todo.completed));

        // 判断【todos】列表
        expect(todos.length).toBe(5);
        expect(todos[0].text).toBe('第一项');
        expect(todos[4].text).toBe('第五项');

        // 使用完成选择器
        todos = selector.get('showCompleted');

        // 判断【todos】列表
        expect(todos.length).toBe(2);
        expect(todos[0].text).toBe('第一项');
        expect(todos[1].completed).toBeTruthy();

        // 使用完成选择器
        todos = selector.get('showUncompleted');

        // 判断【todos】列表
        expect(todos.length).toBe(3);
        expect(todos[0].text).toBe('第二项');
        expect(todos[1].completed).toBeFalsy();
    });

    /* 测试映射【selector】 */
    test('测试映射【selector】', () => {
        let filter = {
                'SHOW_COMPLETED': true,
                'SHOW_UNCOMPLETED': false
            },
            state;


        // 创建选择器
        selector.create('showList', (use, { todos, visibilityFilter }) => (
            todos.filter(todo => visibilityFilter in filter ? todo.completed === filter[visibilityFilter] : true)
        ));

        // 完成项目
        dispatch({ type: 'COMPLETE_TODO', index: 1 });
        dispatch({ type: 'COMPLETE_TODO', index: 2 });

        // 获取状态
        state = selector.use('todos', 'visibilityFilter', 'showList');

        // 判断显示全部【todos】列表
        expect(state.visibilityFilter).toBe('SHOW_ALL');
        expect(state.showList.length).toBe(5);
        expect(state.showList[0].text).toBe('第一项');
        expect(state.showList[4].text).toBe('第五项');

        // 显示完成项目
        dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'});

        // 获取状态
        state = selector.use('todos', 'visibilityFilter', 'showList');

        // 判断显示已经完成【todos】列表
        expect(state.visibilityFilter).toBe('SHOW_COMPLETED');
        expect(state.showList.length).toBe(2);
        expect(state.showList[0].text).toBe('第二项');
        expect(state.showList[0].completed).toBeTruthy();

        // 显示未完成项目
        dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_UNCOMPLETED' });

        // 获取状态
        state = selector.use('todos', 'visibilityFilter', 'showList');

        // 判断显示未完成【todos】列表
        expect(state.visibilityFilter).toBe('SHOW_UNCOMPLETED');
        expect(state.showList.length).toBe(3);
        expect(state.showList[0].text).toBe('第一项');
        expect(state.showList[2].completed).toBeFalsy();
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
