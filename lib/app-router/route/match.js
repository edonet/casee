/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 20:07:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { matchPath } from 'react-router';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const
    model = { matched: '' };


/**
 *****************************************
 * 匹配路由状态
 *****************************************
 */
export default function matchState(router) {
    return function match(state) {
        let matched = matchPath(router.pathname, state);

        // 更新匹配状态
        if (matched) {

            // 完全匹配路径
            if (matched.isExact) {

                // 避免重复的匹配
                if (model.matched === matched.url) {
                    return null;
                }

                // 更新匹配路径
                model.matched = matched.url;

                // 返回匹配对象
                return matched;

            }

            // 过滤非完全匹配的参数路径
            if (matched.params.name) {
                return null;
            }
        }

        // 返回匹配结果
        return matched;
    };
}
