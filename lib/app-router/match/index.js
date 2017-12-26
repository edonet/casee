/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 20:40:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import history from '../history';



/**
 *****************************************
 * 匹配状态
 *****************************************
 */
export default function matchState({ context, resolve }) {
    return function match(path, callback) {
        let pathname = history.pathname;

        path = resolve(path);
    };
}
