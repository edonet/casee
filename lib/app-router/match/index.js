/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-07 16:42:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { matchPath } from 'react-router';
import { resolvePath } from '../history';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const
    action = {
        PUSH: { enter: 'right-enter', leave: 'left-leave' },
        REPLACE: { enter: 'show', leave: 'hide' },
        POP: { enter: 'left-enter', leave: 'right-leave' }
    },
    model = {
        level: 0, leave: null, enter: null, method: ''
    };


/**
 *****************************************
 * 匹配路由状态
 *****************************************
 */
export default function matchState(router) {
    return function match(url, callback) {
        let { pathname, context, method } = router,
            path = resolvePath(context)(url || './:__404__'),
            matched = matchPath(pathname, { path });


        // 匹配成功
        if (matched) {
            let level = (
                    matched.params.__404__ ?
                    context.length :
                    matched.isExact ? Infinity : 0
                );


            // 处理进入页面
            if (level > model.level) {

                // 存在匹配参数
                model.level = level;
                model.method = method;
                model.enter = callback;

            } else if (level) {

                // 取消匹配
                matched = null;
            }
        }

        // 返回匹配结果
        return matched || {
            path, url: '', isExact: false, params: {}
        };
    };
}


/**
 *****************************************
 * 路由更新完成钩子
 *****************************************
 */
export function invokeRouterCallback() {

    // 处理回调
    if (model.enter) {
        let actionType = action[model.method || 'REPLACE'];

        // 执行回调
        model.enter(actionType.enter);
        model.leave && model.leave(actionType.leave);
    }

    // 重置数据
    model.level = 0;
    model.leave = model.enter;
    model.enter = null;
    model.method = '';
}


