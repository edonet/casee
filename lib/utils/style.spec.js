/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 14:31:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { transform, translate, prefixed, vendor } from './style';


/**
 *****************************************
 * 渲染模块
 *****************************************
 */
describe('测试【style】', () => {
    test('测试【transform】', () => {
        let prefixedTransform = prefixed.transform,
            el = document.createElement('div');

        // 校验浏览器前缀
        vendor && expect(prefixedTransform.startsWith(vendor)).toBeTruthy();

        // 修改样式
        transform(el, translate('100%'));

        // 校验结果
        expect(el.style[prefixedTransform]).toBe(translate('100%'));
    });
});
