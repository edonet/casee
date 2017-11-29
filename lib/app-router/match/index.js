/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-28 21:57:43
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
    model = {
        level: 0, callback: null
    };


/**
 *****************************************
 * 匹配路由状态
 *****************************************
 */
export default function matchState(router) {
    return function match(path, callback) {
        let { pathname, context } = router,
            matched = matchPath(pathname, {
                path: resolvePath(context)(path || './:__other__')
            });

        console.log(resolvePath(context)(path || './:__other__'));

        // 处理匹配成功
        if (matched) {

            // 处理完全匹配
            if (matched.isExact && !matched.params.__other__) {

                // 执行匹配回调
                model.callback && model.callback();

                // 更新匹配属性
                model.level = Infinity;
                model.callback = null;

                // 返回匹配结果
                return matched;
            }

            // 处理其它匹配
            if (matched.params.__other__) {

                // 判断是否高于之前等级
                if (context.length > model.level) {

                    // 执行匹配回调
                    model.callback && model.callback();

                    // 更新匹配属性
                    model.level = context.length;
                    model.callback = callback;

                    // 返回匹配对象
                    return {
                        ...matched, url: pathname, isExact: true
                    };
                }

                // 返回匹配空
                return null;
            }
        }

        // 返回匹配结果
        return matched;
    };
}


/**
 *****************************************
 * 重置匹配状态
 *****************************************
 */
export function resetState() {
    model.level = 0;
    model.callback = null;
}
