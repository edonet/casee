/**
 *****************************************
 * Created by lifx
 * Created on 2017-08-13 14:40:08
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 加载依赖
 ****************************************
 */
const
    rules = require('./rules.conf');


/*
 ****************************************
 * 输出配置项
 ****************************************
 */
module.exports = app => ({
    context: app.src,
    output: {
        path: app.dist,
        publicPath: app.publicPath,
        filename: app.filename,
        chunkFilename: app.filename
    },
    resolve: {
        alias: app.alias,
        extensions: ['.js', '.jsx'],
        modules: app.modules
    },
    resolveLoader: {
        modules: app.modules
    },
    module: {
        rules: rules(app),
        noParse: /\.min(\.[\w]+)?$/
    }
});
