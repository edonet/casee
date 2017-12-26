/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-09 16:08:04
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载图标
 *****************************************
 */
export default load(
    require.context('./', false, /\.svgx?$/)
);


/**
 *****************************************
 * 加载图片
 *****************************************
 */
function load(importer) {
    return importer.keys().reduce((data, path) => {
        data[name(path)] = importer(path);
        return data;
    }, {});
}


/**
 *****************************************
 * 生成图标名称
 *****************************************
 */
function name(path) {
    return path.replace(/\.\/(ios-)?/, '').replace(/\.svg$/, '');
}
