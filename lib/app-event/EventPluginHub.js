/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-06 23:16:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import throttle from '../utils/throttle';
import createEvent from './SyntheticEvent';


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
const model = {
    events: {}, queue: {}, listeners: {}
};


/**
 *****************************************
 * 生成捕获
 *****************************************
 */
export default function createCapturer(scope) {
    let events = {};

    // 创建捕获函数
    Object.keys(model.listeners).forEach(key => {
        events[key] = event => {
            scope.props[key] && scope.props[key](event);
            model.queue[key].forEach(task => task.cache = {});
        };
    });

    // 返回事件
    return events;
}


/**
 *****************************************
 * 绑定事件
 *****************************************
 */
export function bindEvent(scope, ...args) {
    let events = {};

    // 生成事件
    args.forEach(argv => {
        if (argv in model.events) {
            model.events[args].forEach(name => {
                if (!(name in events)) {
                    events[name] = model.listeners[name](scope);
                }
            });
        }
    });

    // 返回事件
    return events;
}


/**
 *****************************************
 * 注入事件
 *****************************************
 */
export function inject({ type, dependencies }) {

    // 添加单个事件
    if (typeof type === 'string') {
        let keys = Object.keys(dependencies);

        // 添加事件列表
        keys.forEach(key => {
            if (key in model.queue) {
                model.queue[key].push({ cache: {}, extract: dependencies[key] });
            } else {
                model.queue[key] = [{ cache: {}, extract: dependencies[key] }];
                model.listeners[key] = createEventListener(key);
            }
        });

        // 生成事件依赖
        return model.events[type] = keys;
    }

    // 添加多种事件
    if (Array.isArray(type)) {
        let event = inject(type.shift(), dependencies);

        // 复制事件依赖
        if (event) {
            for (let key of type) {
                model.events[key] = event;
            }
        }
    }
}


/**
 *****************************************
 * 创建事件监听函数
 *****************************************
 */
function createEventListener(type) {
    return function bind(scope) {
        return throttle(function listener(event) {

            // 执行属性事件
            if (scope.props && scope.props[type]) {
                scope.props[type].call(event.currentTarget, event);
            }

            // 执行合成事件
            dispatchEvent(type, event, scope);
        });
    };
}


/**
 *****************************************
 * 派发合成事件
 *****************************************
 */
function dispatchEvent(type, event, scope) {
    if (type in model.queue) {
        model.queue[type].forEach(({ cache, extract }) => {

            // 获取自定义事件
            if (event.nativeEvent !== cache.nativeEvent) {

                // 生成事件
                cache.events = createEventQueue(extract(event));

                // 绑在对象
                cache.nativeEvent = event.nativeEvent;
            }

            // 执行自定义事件回调
            if (cache.events && typeof scope.handleEvent === 'function') {
                invokeEventQueue(scope, event, cache.events);
            }
        });
    }
}


/**
 *****************************************
 * 创建事件队列
 *****************************************
 */
function createEventQueue(data) {
    if (data) {
        if (Array.isArray(data)) {
            return data.map(createEvent);
        } else {
            return [createEvent(data)];
        }
    } else {
        return null;
    }
}


/**
 *****************************************
 * 执行事件队列
 *****************************************
 */
function invokeEventQueue(scope, nativeEvent, eventQueue) {
    for(let event of eventQueue) {
        if (!event.isPropagationStopped()) {

            // 更新当前对象
            event.target = nativeEvent.target;
            event.currentTarget = nativeEvent.currentTarget;

            // 执行事件回调
            scope.handleEvent.call(scope, event);

            // 判断是否中止回调
            if (event.isDefaultPrevented()) {
                return;
            }
        }
    }
}
