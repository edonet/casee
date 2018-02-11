/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 15:22:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 自定义样式转换器
 *****************************************
 */
module.exports = {
    process() {
        return 'module.exports = { __esModule: true, default: (...args) => args.join(" ") };';
    },
    getCacheKey() {
        return 'cssTransform';
    }
};
