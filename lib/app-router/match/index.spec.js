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
import { resolvePath } from '../history';
import matchState from './index';
import router from './index.json';


/**
 *****************************************
 * 测试路由状态匹配
 *****************************************
 */
describe('测试路由状态匹配', () => {

    // 匹配404前的路径
    test('匹配404前的路径', () => {
        let pathname = '/index/about/info';

        walkRouter(router, ({ context, path, matched }) => {
            expect(matchState({ context, pathname })(path)).toEqual(matched[pathname] || null);
        });
    });


    // 匹配404后的路径
    test('匹配404后的路径', () => {
        let pathname = '/index/about/detail';

        walkRouter(router, ({ context, path, matched }) => {
            expect(matchState({ context, pathname })(path)).toEqual(matched[pathname] || null);
        });
    });

    // 匹配404路径
    test('匹配404路径', () => {
        let pathname = '/index/about/other';

        walkRouter(router, ({ context, path, matched }) => {
            expect(matchState({ context, pathname })(path)).toEqual(matched[pathname] || null);
        });
    });

});


/**
 *****************************************
 * 遍历路由
 *****************************************
 */
function walkRouter({ path: context, children }, callback) {
    children && children.forEach(({ path, children, matched = {} }) => {
        callback({ context, path, matched });
        walkRouter({ path: resolvePath(context)(path), children, matched }, callback);
    });
}
