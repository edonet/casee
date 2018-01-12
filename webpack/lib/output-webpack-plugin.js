/**
 *****************************************
 * Created by lifx
 * Created on 2017-08-13 16:55:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义加载状态
 *****************************************
 */
let ready = false;


/**
 *****************************************
 * 定义插件
 *****************************************
 */
class OutputWebpackPlugin {

    // 初始化插件
    constructor(options) {
        this.options = options || {};
    }

    /* 定义插件执行方法 */
    apply(compiler) {
        let {
                data = {},
                test = /\{\{(.*?)\}\}/g,
                callback: onEmitHandler
            } = this.options;


        // 添加事件
        compiler.plugin('compilation', compilation => {

            // 添加模板生成前事件
            compilation.plugin('html-webpack-plugin-before-html-processing', (chunk, callback) => {

                // 获取变量
                if (typeof data === 'function') {
                    data = data() || {};
                }

                // 替换模板变量
                chunk.html = chunk.html.replace(test, (find, $1) => {
                    let [key = '', val = ''] = $1.split(':');

                    // 去除空白
                    key = key.trim();
                    val = val.trim();

                    // 替换变量
                    return key in data ? data[key] : val;
                });

                // 执行回调
                callback(null, chunk);
            });

            // 添加模板生成后
            compilation.plugin('html-webpack-plugin-after-emit', (chunk, callback) => {

                // 准备回调
                if (!ready) {
                    ready = true;

                    let res = onEmitHandler && onEmitHandler(chunk);

                    if (res && 'then' in res) {
                        res.catch(err => console.log(err));
                    }
                }

                // 执行回调
                callback(null, chunk);
            });
        });

        // 监听本地文件更新
        compiler.plugin('invalid', (...args) => {
            // console.log(args);
        });
    }
}


/**
 *****************************************
 * 抛出插件
 *****************************************
 */
module.exports = OutputWebpackPlugin;
