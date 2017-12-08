/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-28 22:07:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import matchState, { invokeRouterCallback, updateAppMatcher } from './index';


/**
 *****************************************
 * 测试单个路由状态匹配
 *****************************************
 */
describe('单个路由状态匹配', () => {

    // 执行匹配前回调
    beforeEach(updateAppMatcher);

    // 执行匹配回调
    afterEach(invokeRouterCallback);

    // 匹配根路由
    test('匹配根路由', () => {
        expect(matchState({ pathname: '/' })('/')).toEqual({
            path: '/', url: '/', isExact: true, params: {}
        });
    });

    // 正常匹配
    test('正常匹配', () => {
        let path = './about',
            router = {
                context: '/index',
                pathname: '/index/about/user'
            };


        // 测试断言
        expect(matchState(router)(path)).toEqual({
            path: '/index/about', url: '/index/about', isExact: false, params: {}
        });
    });

    // 完全匹配
    test('完全匹配', () => {
        let path = './user',
            router = {
                context: '/index/about',
                pathname: '/index/about/user'
            };


        // 测试断言
        expect(matchState(router)(path)).toEqual({
            path: '/index/about/user', url: '/index/about/user', isExact: true, params: {}
        });
    });

    // 匹配404
    test('匹配404', () => {
        let path = '',
            router = {
                context: '/index',
                pathname: '/index/about/user'
            };


        // 测试断言
        expect(matchState(router)(path)).toEqual({
            path: '/index/:__404__', url: '/index/about', isExact: false, params: { __404__: 'about' }
        });
    });

    // 匹配失败
    test('匹配失败', () => {
        let path = './user',
            router = {
                context: '/index',
                pathname: '/index/about/user'
            };


        // 测试断言
        expect(matchState(router)(path)).toEqual({
            path: '/index/user', url: '', isExact: false, params: {}
        });
    });
});


/**
 *****************************************
 * 测试路由系统匹配
 *****************************************
 */
describe('路由系统匹配', () => {
    let router = [
            { context: '/', path: './index', cb: jest.fn() },
            { context: '/index', path: './index', cb: jest.fn() },
            { context: '/index', path: './about', cb: jest.fn() },
            { context: '/index/about', path: './index', cb: jest.fn() },
            { context: '/index/about', path: './user', cb: jest.fn() },
            { context: '/about', path: './index', cb: jest.fn() },
            { context: '/about', path: '', cb: jest.fn() },
            { context: '/', path: '', cb: jest.fn() }
        ];


    // 执行匹配前回调
    beforeEach(updateAppMatcher);

    // 首次匹配
    test('首次匹配', () => {
        let pathname = '/index/about';

        // 遍历路由
        router.forEach(({ context, path, cb }) => {
            matchState({ context, pathname })(path, cb);
        });

        // 执行路由回调
        invokeRouterCallback();

        // 断言匹配结果
        router.forEach(({ cb }, idx) => {
            if (idx === 2) {
                expect(cb.mock.calls.length).toBe(1);
                expect(cb.mock.calls[0][0]).toBe('show');
            } else {
                expect(cb.mock.calls.length).toBe(0);
            }
        });
    });

    // 跳转路由
    test('跳转路由', () => {
        let pathname = '/index/about/user',
            method = 'PUSH';

        // 遍历路由
        router.forEach(({ context, path, cb }) => {
            matchState({ context, pathname, method })(path, cb);
        });

        // 执行路由回调
        invokeRouterCallback();

        // 断言匹配结果
        router.forEach(({ cb }, idx) => {
            if (idx === 2) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('left-leave');
            } else if (idx === 4) {
                expect(cb.mock.calls.length).toBe(1);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
            } else {
                expect(cb.mock.calls.length).toBe(0);
            }
        });
    });

    // 替换路由
    test('替换路由', () => {
        let pathname = '/index/about/index',
            method = 'REPLACE';

        // 遍历路由
        router.forEach(({ context, path, cb }) => {
            matchState({ context, pathname, method })(path, cb);
        });

        // 执行路由回调
        invokeRouterCallback();

        // 断言匹配结果
        router.forEach(({ cb }, idx) => {
            if (idx === 2 ) {
                expect(cb.mock.calls.length).toBe(2);
            } else if (idx === 3) {
                expect(cb.mock.calls.length).toBe(1);
                expect(cb.mock.calls[0][0]).toBe('show');
            } else if (idx === 4) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
                expect(cb.mock.calls[1][0]).toBe('hide');
            } else {
                expect(cb.mock.calls.length).toBe(0);
            }
        });
    });

    // 返回路由
    test('返回路由', () => {
        let pathname = '/index/about',
            method = 'POP';

        // 遍历路由
        router.forEach(({ context, path, cb }) => {
            matchState({ context, pathname, method })(path, cb);
        });

        // 执行路由回调
        invokeRouterCallback();

        // 断言匹配结果
        router.forEach(({ cb }, idx) => {
            if (idx === 2) {
                expect(cb.mock.calls.length).toBe(3);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('left-leave');
                expect(cb.mock.calls[2][0]).toBe('left-enter');
            } else if (idx === 3) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('right-leave');
            } else if (idx === 4) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
                expect(cb.mock.calls[1][0]).toBe('hide');
            } else {
                expect(cb.mock.calls.length).toBe(0);
            }
        });
    });

    // 匹配上级404
    test('匹配上级404', () => {
        let pathname = '/index/user',
            method = 'PUSH';

        // 遍历路由
        router.forEach(({ context, path, cb }) => {
            matchState({ context, pathname, method })(path, cb);
        });

        // 执行路由回调
        invokeRouterCallback();

        // 断言匹配结果
        router.forEach(({ cb }, idx) => {
            if (idx === 2) {
                expect(cb.mock.calls.length).toBe(4);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('left-leave');
                expect(cb.mock.calls[2][0]).toBe('left-enter');
                expect(cb.mock.calls[3][0]).toBe('left-leave');
            } else if (idx === 3) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('right-leave');
            } else if (idx === 4) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
                expect(cb.mock.calls[1][0]).toBe('hide');
            } else if (idx === 7) {
                expect(cb.mock.calls.length).toBe(1);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
            } else {
                expect(cb.mock.calls.length).toBe(0);
            }
        });
    });

    // 匹配同级404
    test('匹配同级404', () => {
        let pathname = '/about/user',
            method = 'PUSH';

        // 遍历路由
        router.forEach(({ context, path, cb }) => {
            matchState({ context, pathname, method })(path, cb);
        });

        // 执行路由回调
        invokeRouterCallback();

        // 断言匹配结果
        router.forEach(({ cb }, idx) => {
            if (idx === 2) {
                expect(cb.mock.calls.length).toBe(4);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('left-leave');
                expect(cb.mock.calls[2][0]).toBe('left-enter');
                expect(cb.mock.calls[3][0]).toBe('left-leave');
            } else if (idx === 3) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('show');
                expect(cb.mock.calls[1][0]).toBe('right-leave');
            } else if (idx === 4) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
                expect(cb.mock.calls[1][0]).toBe('hide');
            } else if (idx === 6) {
                expect(cb.mock.calls.length).toBe(1);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
            } else if (idx === 7) {
                expect(cb.mock.calls.length).toBe(2);
                expect(cb.mock.calls[0][0]).toBe('right-enter');
                expect(cb.mock.calls[1][0]).toBe('left-leave');
            } else {
                expect(cb.mock.calls.length).toBe(0);
            }
        });
    });
});
