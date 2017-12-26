/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 09:18:56
 *****************************************
 */
'use strict';



/**
 *****************************************
 * 浏览器前缀
 *****************************************
 */
export const vendor = (() => {
    let vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
        style = document.createElement('div').style;

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
    prefixStyle('perspective') in document.createElement('div').style
);


/**
 *****************************************
 * 偏移属性
 *****************************************
 */
export const absolute = (top = 0, right = top, bottom = top, left = right) => ({
    position: 'absolute', top, right, bottom, left
});


/**
 *****************************************
 * 变换属性
 *****************************************
 */
export const transform = value => ({ [prefixed.transform]: value });


/**
 *****************************************
 * 过滤属性
 *****************************************
 */
export const transition = value => ({ [prefixed.transition]: value });


/**
 *****************************************
 * 位移属性
 *****************************************
 */
export const translate = (x, y, z) => transform(
    `translate(${x || 0}, ${y || 0})` + (hasPerspective ? ` translateZ(${z || 0})` : '')
);

