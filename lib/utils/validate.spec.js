/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 15:10:56
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import validate, { isString, isNumber, isBoolean, isFunction, isArray, isObject, isRegExp } from './validate';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【validate】', () => {

    /* 校验数据类型 */
    test('校验数据类型', () => {
        let typeList = [
                'string', 'number', 'boolean', 'function', 'array', 'object', 'regexp', 'null', 'undefined'
            ];

        // 检验类型
        expect(validate('', ...typeList)).toBe('string');
        expect(validate(1, ...typeList)).toBe('number');
        expect(validate(NaN, ...typeList)).toBe('number');
        expect(validate(Infinity, ...typeList)).toBe('number');
        expect(validate(true, ...typeList)).toBe('boolean');
        expect(validate(false, ...typeList)).toBe('boolean');
        expect(validate(f => f, ...typeList)).toBe('function');
        expect(validate([], ...typeList)).toBe('array');
        expect(validate({}, ...typeList)).toBe('object');
        expect(validate(/^a/, ...typeList)).toBe('regexp');
        expect(validate(null, ...typeList)).toBe('null');
        expect(validate(undefined, ...typeList)).toBe('undefined');
    });

    /* 校验字符串 */
    test('校验字符串', () => {
        expect(isString()).toBeFalsy();
        expect(isString(1)).toBeFalsy();
        expect(isString('1')).toBeTruthy();
        expect(isString(NaN)).toBeFalsy();
        expect(isString(Infinity)).toBeFalsy();
        expect(isString(true)).toBeFalsy();
        expect(isString(false)).toBeFalsy();
        expect(isString(f => f)).toBeFalsy();
        expect(isString([])).toBeFalsy();
        expect(isString({})).toBeFalsy();
        expect(isString(/^a/)).toBeFalsy();
        expect(isString(null)).toBeFalsy();
        expect(isString(undefined)).toBeFalsy();
    });

    /* 校验数字 */
    test('校验数字', () => {
        expect(isNumber()).toBeFalsy();
        expect(isNumber(1)).toBeTruthy();
        expect(isNumber('1')).toBeFalsy();
        expect(isNumber(NaN)).toBeTruthy();
        expect(isNumber(Infinity)).toBeTruthy();
        expect(isNumber(true)).toBeFalsy();
        expect(isNumber(false)).toBeFalsy();
        expect(isNumber(f => f)).toBeFalsy();
        expect(isNumber([])).toBeFalsy();
        expect(isNumber({})).toBeFalsy();
        expect(isNumber(/^a/)).toBeFalsy();
        expect(isNumber(null)).toBeFalsy();
        expect(isNumber(undefined)).toBeFalsy();
    });

    /* 校验布尔值 */
    test('校验布尔值', () => {
        expect(isBoolean()).toBeFalsy();
        expect(isBoolean(1)).toBeFalsy();
        expect(isBoolean('1')).toBeFalsy();
        expect(isBoolean(NaN)).toBeFalsy();
        expect(isBoolean(Infinity)).toBeFalsy();
        expect(isBoolean(true)).toBeTruthy();
        expect(isBoolean(false)).toBeTruthy();
        expect(isBoolean(f => f)).toBeFalsy();
        expect(isBoolean([])).toBeFalsy();
        expect(isBoolean({})).toBeFalsy();
        expect(isBoolean(/^a/)).toBeFalsy();
        expect(isBoolean(null)).toBeFalsy();
        expect(isBoolean(undefined)).toBeFalsy();
    });

    /* 校验函数 */
    test('校验函数', () => {
        expect(isFunction()).toBeFalsy();
        expect(isFunction(1)).toBeFalsy();
        expect(isFunction('1')).toBeFalsy();
        expect(isFunction(NaN)).toBeFalsy();
        expect(isFunction(Infinity)).toBeFalsy();
        expect(isFunction(true)).toBeFalsy();
        expect(isFunction(false)).toBeFalsy();
        expect(isFunction(f => f)).toBeTruthy();
        expect(isFunction([])).toBeFalsy();
        expect(isFunction({})).toBeFalsy();
        expect(isFunction(/^a/)).toBeFalsy();
        expect(isFunction(null)).toBeFalsy();
        expect(isFunction(undefined)).toBeFalsy();
    });

    /* 校验数组 */
    test('校验数组', () => {
        expect(isArray()).toBeFalsy();
        expect(isArray(1)).toBeFalsy();
        expect(isArray('1')).toBeFalsy();
        expect(isArray(NaN)).toBeFalsy();
        expect(isArray(Infinity)).toBeFalsy();
        expect(isArray(true)).toBeFalsy();
        expect(isArray(false)).toBeFalsy();
        expect(isArray(f => f)).toBeFalsy();
        expect(isArray([])).toBeTruthy();
        expect(isArray({})).toBeFalsy();
        expect(isArray(/^a/)).toBeFalsy();
        expect(isArray(null)).toBeFalsy();
        expect(isArray(undefined)).toBeFalsy();
    });

    /* 校验对象 */
    test('校验对象', () => {
        expect(isObject()).toBeFalsy();
        expect(isObject(1)).toBeFalsy();
        expect(isObject('1')).toBeFalsy();
        expect(isObject(NaN)).toBeFalsy();
        expect(isObject(Infinity)).toBeFalsy();
        expect(isObject(true)).toBeFalsy();
        expect(isObject(false)).toBeFalsy();
        expect(isObject(f => f)).toBeFalsy();
        expect(isObject([])).toBeFalsy();
        expect(isObject({})).toBeTruthy();
        expect(isObject(/^a/)).toBeFalsy();
        expect(isObject(null)).toBeFalsy();
        expect(isObject(undefined)).toBeFalsy();
    });

    /* 校验正则 */
    test('校验正则', () => {
        expect(isRegExp()).toBeFalsy();
        expect(isRegExp(1)).toBeFalsy();
        expect(isRegExp('1')).toBeFalsy();
        expect(isRegExp(NaN)).toBeFalsy();
        expect(isRegExp(Infinity)).toBeFalsy();
        expect(isRegExp(true)).toBeFalsy();
        expect(isRegExp(false)).toBeFalsy();
        expect(isRegExp(f => f)).toBeFalsy();
        expect(isRegExp([])).toBeFalsy();
        expect(isRegExp({})).toBeFalsy();
        expect(isRegExp(/^a/)).toBeTruthy();
        expect(isRegExp(null)).toBeFalsy();
        expect(isRegExp(undefined)).toBeFalsy();
    });
});
