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
import observer from '../../utils/observer';
import throttle from '../../utils/throttle';
import createSyntheticEvent from './SyntheticEvent';


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
const model = {
    ob: observer(),
    events: {},
    queue: {},
    listeners: {}
};


/**
 *****************************************
 * 监听事件回调
 *****************************************
 */
model.ob.subscribe(({ type, event, scope }) => {
    if (type in model.queue) {
        model.queue[type].forEach(({ cache, extract }) => {

            // 获取自定义事件
            if (event.target !== cache.target) {
                let result = extract(event);

                // 生成事件
                if (result) {
                    if (Array.isArray(result)) {
                        cache.events = result.map(createEvent);
                    } else {
                        cache.events = [createEvent(result)];
                    }
                } else {
                    cache.events = null;
                }

                // 绑在对象
                cache.target = event.target;
            }

            // 执行自定义事件回调
            if (cache.events && typeof scope.handleEvent === 'function') {
                for(let event of cache.events) {
                    if (!event.isPropagationStopped()) {

                        // 执行事件回调
                        scope.handleEvent(event);

                        // 判断是否中止回调
                        if (event.isDefaultPrevented()) {
                            return;
                        }
                    }
                }
            }
        });
    }
});


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
            model.queue[key].forEach(({ cache }) => cache.target = cache.events = null);
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
export function bind(scope, ...args) {
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
                model.queue[key].push({ cache: null, extract: dependencies[key] });
            } else {
                model.queue[key] = [{ cache: null, extract: dependencies[key] }];
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
            if (scope.props[type]) {
                scope.props[type].call(event.currentTarget, event);
            }

            // 执行合成事件
            if (!event.isDefaultPrevented()) {
                model.ob.publish({ type, event, scope });
            }
        });
    };
}


/**
 *****************************************
 * 创建合成事件
 *****************************************
 */
function createEvent({ type, data, isPropagationStopped = false }) {
    let syntheticEvent = createSyntheticEvent(type, data);

    // 阻止冒泡
    isPropagationStopped && syntheticEvent.stopPropagation();

    // 返回合成事件
    return syntheticEvent;
}
