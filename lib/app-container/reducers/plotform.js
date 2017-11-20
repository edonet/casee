/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 12:51:13
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 获取平台信息
 *****************************************
 */
export default () => {
    let ua = navigator.userAgent;

    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        return 'ios';
    } else if (/(Android)/i.test(ua)) {
        return 'android';
    }

    return 'pc';
};
