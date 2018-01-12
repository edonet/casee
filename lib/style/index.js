/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-13 16:46:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss?global';
import * as style from '$$style';
import * as settings from './settings';


/**
 *****************************************
 * 抛出风格设置
 *****************************************
 */
export default { ...settings, ...style };
export * from './lib/utils';


/**
 *****************************************
 * 组合样式
 *****************************************
 */
export function compose(...args) {
    let list = [],
        add = name => name && list.push(name);

    // 遍历参数
    args.forEach(name => {
        let type = typeof name;

        // 处理字符串
        if (type === 'string') {
            return add(name);
        }

        // 处理列表
        if (Array.isArray(name)) {
            return add(compose(...name));
        }

        // 处理对象
        if (type === 'object') {
            return list = list.concat(Object.keys(name).filter(key => !!name[key]));
        }

        // 处理函数
        if (type === 'function') {
            return add(compose(name()));
        }
    });

    // 返回样式
    return list.join(' ');
}
