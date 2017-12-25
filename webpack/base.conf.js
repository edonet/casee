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
module.exports = settings => ({
    context: settings.src,
    output: {
        path: settings.dist,
        publicPath: settings.publicPath,
        filename: settings.filename,
        chunkFilename: settings.filename
    },
    resolve: {
        alias: settings.alias || {},
        extensions: ['.js', '.jsx'],
        modules: settings.modules || ['node_modules']
    },
    resolveLoader: {
        modules: settings.modules || ['node_modules']
    },
    module: {
        rules: rules(settings),
        noParse: /\.min(\.[\w]+)?$/
    }
});
