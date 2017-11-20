/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 14:47:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import deepEqual from 'deep-equal';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const
    model = {
        v: + new Date(),
        get: null,
        dispatch: null,
        selectors: {}
    };


/**
 *****************************************
 * 抛出数据模型
 *****************************************
 */
export default model;


/**
 *****************************************
 * 更新数据模型
 *****************************************
 */
export function initSelector(store) {

    // 更新时间戳
    store.subscribe(() => model.v ++);

    // 设置行为派发接口
    model.dispatch = action => {

        // 处理同步行为
        if ('type' in action) {
            return store.dispatch(action);
        }

        // 处理异步行为
        if (typeof action.then === 'function') {
            return action.then(model.dispatch);
        }
    };

    // 设置选择器获取方法
    model.get = (name, state) => {

        // 从选择器中获取
        if (name in model.selectors) {
            let selector = model.selectors[name];

            // 更新选择器值
            if (selector.v !== model.v) {
                let value = selector.creator(
                        state, name => model.get(name, state)
                    );

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

        // 从状态中返回值
        return name in state ? state[name] : store.getState()[name];
    };
}


/**
 *****************************************
 * 派发行为
 *****************************************
 */
export function dispatch(action) {
    return model.dispatch && model.dispatch(action);
}


/**
 *****************************************
 * 获取选择器
 *****************************************
 */
export function mapSelector(...args) {
    let injectors = [],
        selectors = [],
        dispatchers = {
            dispatch: model.dispatch
        };


    // 处理参数
    args.forEach(name => {

        // 分离选择器
        if (typeof name === 'string') {
            name in model.selectors ? selectors.push(name) : injectors.push(name);
        }

        // 处理派发器
        if (typeof name === 'object') {
            Object.keys(name).forEach(
                key => typeof name[key] === 'function' && (
                    dispatchers[key] = (...args) => model.dispatch(name[key](...args))
                )
            );
        }
    });


    // 返回处理方法
    return [
        state => (
            injectors.reduce((props, name) => (props[name] = state[name], props) , {})
        ),
        null,
        (state, dispatch, props) => (
            selectors.reduce(
                (data, name) => (data[name] = model.get(name, data), data),
                { ...props, ...state, ...dispatchers }
            )
        )
    ];
}
