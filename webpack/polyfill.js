/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 16:15:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 修复路由跳转导致热更新失效
 *****************************************
 */
if (process.env.NODE_ENV === 'development') {
    let addEventListener = window.addEventListener;

    window.addEventListener = (type, handler, options) => {
        if (type !== 'beforeunload' || handler.toString().indexOf('isUnloading') === 0) {
            return addEventListener(type, handler, options);
        }
    };
}
