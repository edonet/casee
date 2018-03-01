/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 14:16:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 获取变量
 *****************************************
 */
const doc = document;


/**
 *****************************************
 * 获取浏览器前缀
 *****************************************
 */
export const vendor = (() => {
    let vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
        style = doc.createElement('div').style;

    for (let str of vendors) {
        if (str + 'ransform' in style) {
            return str.slice(0, -1);
        }
    }

    return '';
})();


/**
 *****************************************
 * 补全样式
 *****************************************
 */
export const prefixStyle = vendor ? (style => (
    vendor + style.charAt(0).toUpperCase() + style.substr(1)
)) : (style => style);


/**
 *****************************************
 * 常用补全样式
 *****************************************
 */
export const prefixed = {
    transform: prefixStyle('transform'),
    transition: prefixStyle('transition'),
    transitionTimingFunction: prefixStyle('transitionTimingFunction'),
    transitionDuration: prefixStyle('transitionDuration'),
    transitionDelay: prefixStyle('transitionDelay')
};


/**
 *****************************************
 * 是否支持透视
 *****************************************
 */
export const hasPerspective = (
    prefixStyle('perspective') in doc.createElement('div').style
);


/**
 *****************************************
 * 变换属性
 *****************************************
 */
export const transform = (
    (el, value) => el.style[prefixed.transform] = value
);


/**
 *****************************************
 * 过滤属性
 *****************************************
 */
export const transition = (
    (el, value) => el.style[prefixed.transition] = value
);


/**
 *****************************************
 * 位移属性
 *****************************************
 */
export const translate = hasPerspective ? (x, y, z) => (
    `translate(${x || 0}, ${y || 0}) translateZ(${z || 0})`
) : (x, y) => (
    `translate(${x || 0}, ${y || 0})`
);
