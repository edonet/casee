/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-07 10:21:07
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import mount, { append } from './actions';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【AppContent】', () => {

    /* 测试【加载视图】 */
    test('测试【加载视图】', () => {
        let doc = document,
            target = doc.createElement('ul'),
            li = [
                doc.createElement('li'),
                doc.createElement('li'),
                doc.createElement('li'),
                doc.createElement('li'),
                doc.createElement('li'),
                doc.createElement('li')
            ],
            cb = [],
            els;

        // 添加元素
        cb.push(append(li[0]));
        cb.push(append(li[1]));
        cb.push(append(li[2]));

        // 挂载元素
        mount(target);

        // 添加元素
        cb.push(append(li[3]));
        cb.push(append(li[4]));
        cb.push(append(li[5]));

        // 获取节点
        els = target.childNodes;

        // 校验结果
        li.forEach((el, idx) => expect(els[idx]).toBe(el));
        expect(els).toHaveLength(6);

        // 移除节点
        cb.shift()();
        cb.pop()();

        // 检验结果
        expect(target.childNodes).toHaveLength(4);

        // 清空节点
        cb.forEach(fn => fn());

        // 检验结果
        expect(target.childNodes).toHaveLength(0);
        expect(target.outerHTML).toBe('<ul></ul>');
    });
});
