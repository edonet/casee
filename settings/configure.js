/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-04 11:23:14
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义依赖
 *****************************************
 */
const
    env = process.env.NODE_ENV,
    isProduction = env === 'production';


/**
 *****************************************
 * 抛出配置方法
 *****************************************
 */
module.exports = ({ cwd, dir, index, src, dist, style, alias, devServer, ...settings }) => {
    let app = {
            cwd,
            env,
            isProduction,
            settings,
            src: cwd(src),
            dist: cwd(dist),
            entry: cwd(src, 'index.js'),
            index: cwd(index),
            filename: 'js/[name].[chunkhash].js',
            publicPath: './',
            modules: [
                dir('../node_modules'),
                dir('../../node_modules'),
                cwd('node_modules')
            ],
            alias: {
                ...alias,
                'sigo': dir('../lib'),
                'style': dir('../lib/style'),
                'selector': dir('../lib/selector'),
                '$$style': cwd(style)
            },
            stats: {
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }
        };


    // 处理开发环境参数
    if (!isProduction) {

        // 定义服务器参数
        app.devServer = {
            hot: true,
            host: require('./ip')(),
            port: 10098,
            https: false,
            disableHostCheck: true,
            contentBase: app.dist,
            publicPath: '/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
            watchContentBase: true,
            watchOptions: {
                ignored: /node_modules/
            },
            proxy: settings.proxy || {},
            compress: true,
            inline: true,
            stats: app.stats,
            ...devServer
        };

        // 定义输出信息
        app.filename = 'js/[name].bundle.js';
        app.publicPath = `http${app.https ? 's' : ''}://${app.devServer.host}:${app.devServer.port}/`;
    }

    // 返回配置
    return app;
};
