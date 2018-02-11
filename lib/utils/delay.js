/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-08 14:24:07
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 延时执行
 *****************************************
 */
export default function delay(duration = 0, callback = null) {
    return new Promise(
        resolve => setTimeout(() => resolve(callback && callback()), duration)
    );
}
