/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 14:00:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import deepEqual from 'deep-equal';
import each from '../utils/each';


/**
 *****************************************
 * 初始化选择器
 *****************************************
 */
export default function initSelector(store) {
    let model = { v: 0, selectors: {} },
        selector = {};

    /* 监听数据更新 */
    store.subscribe(() => model.v ++ );

    /* 创建接口 */
    selector.get = getSelector(store, model);
    selector.map = mapSelector(store.dispatch, selector.get);
    selector.use = useSelector(store, selector.map);
    selector.create = createSelector(model.selectors);

    /* 抛出接口 */
    return selector;
}


/**
 *****************************************
 * 获取选择器
 *****************************************
 */
function getSelector(store, model) {
    return function get(name, props = {}) {
        let state = store.getState();

        // 直接返回状态
        if (name in state) {
            return state[name];
        }

        // 返回选择器结果
        if (name in model.selectors) {
            let selector = model.selectors[name];

            // 更新选择器
            if (selector.v !== model.v) {
                let value = selector.creator(get, props);

                // 判断是否需要更新
                if (!deepEqual(value, selector.value, { strict: true })) {
                    selector.value = value;
                }

                // 更新时间戳
                selector.v = model.v;
            }

            // 返回结果
            return selector.value;
        }

        // 返回null
        return null;
    };
}


/**
 *****************************************
 * 使用选择器
 *****************************************
 */
function useSelector(store, map) {
    return function use(...args) {
        return (cb => cb[2](cb[0](store.getState())))(map(...args));
    };
}


/**
 *****************************************
 * 创建选择器
 *****************************************
 */
function createSelector(selectors) {
    return function create(name, handler) {

        // 单个创建选择器
        if (typeof name === 'string' && typeof handler === 'function') {

            // 校验选择器是还已经存在
            if (name in selectors) {
                throw new Error(`the selector "${ name }" will to create is exists!`);
            }

            // 创建选择器
            return selectors[name] = { creator: handler };
        }

        // 批量创建选择器
        if (name && typeof name === 'object') {
            return Object.keys(name).map(key => create(key, name[key]));
        }

        // 返回null
        return null;
    };
}


/**
 *****************************************
 * 生成选择器映射
 *****************************************
 */
function mapSelector(dispatch, getSelector) {
    return function map(...args) {
        let dispatchers = { dispatch },
            selectors, mapState, mergeState;


        // 过滤参数
        args = args.filter(name => {

            // 分离选择器
            if (typeof name === 'string') {
                return true;
            }

            // 处理派发器
            if (typeof name === 'object') {
                each(name, (key, handler) => {
                    typeof handler === 'function' && (
                        dispatchers[key] = (...args) => dispatch(handler(...args))
                    );
                });
            }
        });

        // 映射状态
        mapState = state => {
             let data = {};

            // 初始化选择器
            selectors = [];

            // 获取状态
            args.forEach((name) => {
                name in state ? (data[name] = state[name]) : selectors.push(name);
            });

            // 返回状态
            return data;
        };

        // 合并状态
        mergeState = (state, dispatch, props) => {
            let data = { ...state, ...dispatch, ...props };

            // 获取选择器
            selectors.forEach(name => data[name] = getSelector(name, data));

            // 返回结果
            return data;
        };

        // 返回映射接口
        return [mapState, null, mergeState];
    };
}
