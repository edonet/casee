/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-25 10:51:11
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义属性
 *****************************************
 */
const
    toString = Object.prototype.toString,
    typeName = {
        'string': '[object String]',
        'number': '[object Number]',
        'function': '[object Function]',
        'array': '[object Array]',
        'object': '[object Object]',
        'regexp': '[object RegExp]',
        'boolean': '[object Boolean]',
        'undefined': '[object Undefined]',
        'null': '[object Null]'
    };


/**
 *****************************************
 * 校验数据类型
 *****************************************
 */
export default function validate(object, ...typeList) {
    let type = toString.call(object);

    for (let key of typeList) {
        if (type === typeName[key]) {
            return key;
        }
    }

    return invaliedType(type, ...typeList);
}


/**
 *****************************************
 * 常用类型校验
 *****************************************
 */
export const isString = validater('string');
export const isNumber = validater('number');
export const isFunction = validater('function');
export const isBoolean = validater('boolean');
export const isArray = object => validate(object, 'array');
export const isObject = object => validate(object, 'object');
export const isRegExp = object => validate(object, 'regexp');


/**
 *****************************************
 * 类型校验器
 *****************************************
 */
export function validater(valiedType) {
    return object => {
        let type = typeof object;

        if (type === valiedType) {
            return true;
        }

        return invaliedType(typeName[type], valiedType);
    };
}


/**
 *****************************************
 * 输出无效类型信息
 *****************************************
 */
export function invaliedType(invalied, ...args) {

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a "${ args.join('/') }" but got: ${ invalied || '[object Unknown]' } !`);
    }

    return false;
}
