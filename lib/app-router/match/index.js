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
    model = { matched: '' };


/**
 *****************************************
 * 匹配路由状态
 *****************************************
 */
export default function matchState(router) {
    return function match(path, callback) {
        let { pathname, context } = router,
            matched = matchPath(pathname, {
                path: resolvePath(context)(path || './:__matched')
            });

        console.log(matched);

        return matched;


        //     matched = matchPath(pathname, {
        //         path: resolve(state.path || './$$name')
        //     });

        // // 更新匹配状态
        // if (matched) {

        //     // 完全匹配路径
        //     if (matched.isExact) {

        //         // 避免重复的匹配
        //         if (model.matched === matched.url) {
        //             return null;
        //         }

        //         // 更新匹配路径
        //         model.matched = matched.url;

        //         // 返回匹配对象
        //         return matched;

        //     }

        //     // 过滤非完全匹配的参数路径
        //     if (matched.params.$$name) {
        //         return null;
        //     }
        // }

        // // 返回匹配结果
        // return matched;
    };
}
