/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 14:37:11
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { resolve } from './path';


/**
 *****************************************
 * 测试路径
 *****************************************
 */
describe('测试路径', () => {

    /* 测试路径解析 */
    test('测试路径解析', () => {

        // 检验默认返回根目录
        expect(resolve()).toBe('/');

        // 检验当前目录
        expect(resolve('./index/about')).toBe('/index/about');
        expect(resolve('./index/./././about')).toBe('/index/about');

        // 检验上一目录目录
        expect(resolve('./index/../about')).toBe('/about');
        expect(resolve('./index/.././about')).toBe('/about');

        // 检验多参数
        expect(resolve('./index', '../about/user', '../route')).toBe('/about/route');
        expect(resolve('./index', '../about/user', '/route')).toBe('/route');
        expect(resolve('./index', '../about/user', '/route', '../../abc')).toBe('/');
        expect(resolve('./index', '../about/user', '/route', '../../../abc')).toBe('/');
        expect(resolve('./index', '../about/user', '/route', '../../abc/../')).toBe('/');
        expect(resolve('./index', '../about/user', '/route', '../../abc/.../')).toBe('/...');
    });
});
