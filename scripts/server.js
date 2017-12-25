/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 18:43:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 服务器配置
 *****************************************
 */
module.exports = ({ dist, stats, devServer = {} }) => ({
    hot: true,
    hotOnly: true,
    host: 'localhost',
    port: 10098,
    https: false,
    disableHostCheck: true,
    contentBase: dist,
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
    compress: true,
    inline: true,
    stats,
    ...devServer
});
