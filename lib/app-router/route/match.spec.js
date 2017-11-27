/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 20:40:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import matchState from './match';


/**
 *****************************************
 * 测试路由状态匹配器
 *****************************************
 */
test('测试路由状态匹配器', () => {

    let match = matchState({
            pathname: '/index/about/detail'
        }),
        urls = {
            '/': {
                url: '/', path: '/', isExact: false, params: {}
            },
            '/:name': null,
            '/index/about/:name': {
                url: '/index/about/detail', path: '/index/about/:name', isExact: true, params: { name: 'detail' }
            },
            '/index/about/detail': null,
            '/index/about/:path': null,
            '/index/about': {
                url: '/index/about', path: '/index/about', isExact: false, params: {}
            },
            '/index/about/detail?method=push': null,
            '/index/contact': null
        };


    // 配置各路径x
    Object.keys(urls).forEach(key => {
        expect(match(key)).toEqual(urls[key]);
    });

});
