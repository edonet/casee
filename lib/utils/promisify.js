/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-09 10:41:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isFunction } from './validate';


/**
 *****************************************
 * 【Promise】化
 *****************************************
 */
export default function promisify(handler) {

    // 校验参数
    if (!isFunction(handler)) {
        return () => (
            handler instanceof Error ? Promise.reject(handler) : Promise.resolve(handler)
        );
    }

    // 返回【promise】
    return function promise(...args) {
        return new Promise((resolve, reject) => {

            // 添加回调
            args.push((err, data) => {
                err && err instanceof Error ? reject(err) : resolve(err || data);
            });

            // 执行函数
            handler.apply(this, args);
        });
    };
}
