/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 18:00:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    env = process.env.NODE_ENV,
    isProduction = env === 'production';


/**
 *****************************************
 * 抛出配置
 *****************************************
 */
module.exports = ({ cwd, dir, ...settings }) => ({
    env,
    isProduction,
    rootDir: dir(),
    src: cwd(settings.src),
    dist: cwd(settings.dist),
    entry: cwd(settings.entry),
    index: cwd(settings.index),
    modules: settings.modules,
    filename: 'js/[name].[chunkhash].js',
    publicPath: './',
    alias: {
        ...settings.alias,
        sigo: dir('lib'),
        selector: dir('lib/selector'),
        style: dir('lib/style'),
        $$utils: dir('lib/utils'),
        $$component: dir('lib/utils/component'),
        $$animate: dir('lib/utils/animate'),
        $$style: cwd(settings.style)
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    devServer: {
        host: require('./ip')(),
        ...settings.devServer
    }
});
