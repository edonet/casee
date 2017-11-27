/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 15:34:48
 *****************************************
 */
'use strict';

import { resolvePath, pushState, replaceState, popState } from './index';


/**
 *****************************************
 * 测试路由解析
 *****************************************
 */
test('解析路径', () => {

    // 默认从根目录开始解析
    expect(resolvePath()('./index')).toBe('/index');

    // 示明示时默认为当前目录
    expect(resolvePath('/about')('index')).toBe('/about/index');
    expect(resolvePath('/about')('./index')).toBe('/about/index');
    expect(resolvePath('/about')('./index/../news')).toBe('/about/news');

    // 无法超出根目录
    expect(resolvePath()('../index')).toBe('/index');

    // 过滤空目录
    expect(resolvePath('/about')('.//index')).toBe('/about/index');

    // 可以指定绝对目录
    expect(resolvePath('/about')('/index')).toBe('/index');

    // 支持指定多个路径
    expect(resolvePath('/index')('./index', '../about', '/c', 'a')).toBe('/c/a');
    expect(resolvePath('/about')('./index', '../news', '.../a//.//b/../c/.../d')).toBe('/about/news/.../a/c/.../d');
});


/**
 *****************************************
 * 测试跳转路径
 *****************************************
 */
test('跳转路径', () => {

    let router = {
            pathname: '/about/index',
            resolve: resolvePath('/about')
        };


    // 当前路径不跳转
    expect(pushState(router)('./index')).toBeNull();

    // 同级跳转
    expect(pushState(router)('./news')).toEqual({
        action: 'PUSH', method: 'PUSH', path: '/about/news'
    });

    // 跳转到上一级且指定方式
    expect(pushState(router)('../news', { method: 'REPLACE' })).toEqual({
        action: 'PUSH', method: 'REPLACE', path: '/news'
    });
});



/**
 *****************************************
 * 测试替换路径
 *****************************************
 */
test('替换路径', () => {

    let router = {
            pathname: '/about/index',
            resolve: resolvePath('/about')
        };


    // 当前路径不替换
    expect(replaceState(router)('./index')).toBeNull();

    // 同级替换
    expect(replaceState(router)('./news', { method: 'PUSH' })).toEqual({
        action: 'REPLACE', method: 'PUSH', path: '/about/news'
    });

    // 替换到上一级且指定方式
    expect(replaceState(router)('../news')).toEqual({
        action: 'REPLACE', method: 'REPLACE', path: '/news'
    });
});


/**
 *****************************************
 * 回退路径
 *****************************************
 */
test('回退路径', () => {

    let router = {
            pathname: '/about/index/news',
            histories: ['/', '/about', '/about/index', '/about/index/news'],
            resolve: resolvePath('/about')
        };


    // 当前路径不回退
    expect(popState(router)(0)).toBeNull();
    expect(popState(router)('./index/news')).toBeNull();

    // 默认回退到上一路径
    expect(popState(router)()).toEqual({
        action: 'POP', method: 'POP', path: '/about/index', step: -1
    });

    // 退回指定步数
    expect(popState(router)(2)).toEqual({
        action: 'POP', method: 'POP', path: '/about', step: -2
    });

    // 退回到根路径
    expect(popState(router)(-10)).toEqual({
        action: 'POP', method: 'POP', path: '/', step: -3
    });

    // 退回到指定路径
    expect(popState(router)('./about/../index/../../about')).toEqual({
        action: 'POP', method: 'POP', path: '/about', step: -2
    });

    // 退回到新的路径
    expect(popState(router)('/index')).toEqual({
        action: 'REPLACE', method: 'POP', path: '/index', step: -3
    });

    // 重新路由参数
    router = {
        pathname: '/about/index/news',
        histories: ['/about/index/news'],
        resolve: resolvePath('/about')
    };

    // 只有一级路由是无法回退
    expect(popState(router)()).toBeNull();

    // 只有一级路由是无法回退，但可回去到指定路径
    expect(popState(router)('/index')).toEqual({
        action: 'REPLACE', method: 'POP', path: '/index', step: 0
    });
});
