/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 10:20:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 事件配置支持
 *****************************************
 */
export const addEventListener = (() => {
    try {
        let isPassived = false,
            options = Object.defineProperty({}, 'passive', {
                get: () => isPassived = true
            });


        // 测试属性
        window.addEventListener('test', null, options);

        // 测试通过
        if (isPassived) {
            return (el, name, handler, options) => {
                return el.addEventListener(name, handler, { passive: true, ...options });
            };
        }

    } catch (e) {
        // 不作处理
    }

    // 返回默认函数
    return (el, name, handler) => {
        return el.addEventListener(name, handler, false);
    };
})();


/**
 *****************************************
 * 元素类
 *****************************************
 */
export class Element {

    /* 初始化元素 */
    constructor(el) {
        if (el === undefined) {
            this.$$el = document.createElement('div');
        } else if (typeof el === 'string') {
            this.$$el = document.getElementById(el);
        } else {
            this.$$el = el;
        }
    }

    /* 添加事件 */
    addEventListener(...args) {
        return addEventListener(this.$$el, ...args);
    }
}


/**
 *****************************************
 * 获取元素
 *****************************************
 */
export default function element(el) {
    return new Element(el);
}
