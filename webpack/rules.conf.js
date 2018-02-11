'use strict';


/*
 ****************************************
 * 加载依赖模块
 ****************************************
 */
const
    varImporter = require('var-importer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    postCSSOptions = require('./postcss.conf'),
    resolve = require.resolve;


/*
 ****************************************
 * 定义生成加载器方法
 ****************************************
 */
function loaderCreator(app) {
    return (name, options) => ({
        loader: name + '-loader',
        options: Object.assign({ sourceMap: !app.isProduction }, options)
    });
}


/*
 ****************************************
 * 输出配置项
 ****************************************
 */
module.exports = settings => {
    let loader = loaderCreator(settings),
        postcssLoader = loader('postcss', postCSSOptions),
        sassLoader = loader('sass', { importer: varImporter({ alias: settings.alias }) });


    // 加载器列表
    return [
        {
            test: /\.jsx?$/,
            exclude: /node_modules[\\/]+(?!webpack-dev-server)/,
            loader: 'babel-loader',
            options: {
                presets: [resolve('babel-preset-react-app')]
            }
        },
        {
            test: /\.s?css$/,
            oneOf: [
                {
                    resourceQuery: /global/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            loader('css', { minimize: true }),
                            postcssLoader, sassLoader
                        ]
                    })
                },
                {
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            resolve('./lib/precss-loader'),
                            loader('css', {
                                minimize: true, modules: true, localIdentName: '[local]-[hash:base64:6]'
                            }),
                            postcssLoader, sassLoader
                        ]
                    })
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            exclude: /[\\/]svgx[\\/]/,
            options: {
                limit: 8192,
                name: 'img/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'fonts/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.svgx$/,
            loader: 'svgx-loader'
        },
        {
            test: /\.svg$/,
            include: /[\\/]svgx[\\/]/,
            loader: 'svgx-loader'
        },
        {
            test: /\.tpl$/,
            loader: 'raw-loader'
        }
    ];
};
