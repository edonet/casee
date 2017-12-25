/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 14:15:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    app = require('../settings'),
    resolve = require.resolve;


/**
 *****************************************
 * 输出配置
 *****************************************
 */
module.exports = {
    rootDir: app.rootDir,
    roots: [
        '<rootDir>/lib/', '<rootDir>/src/'
    ],
    testMatch: [
        '**/?(*.)(spec|test).js'
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx)$': resolve('./jsTransform.js'),
        '^.+\\.css$': resolve('./cssTransform.js'),
        '^(?!.*\\.(js|jsx|css|json)$)': resolve('./fileTransform.js')
    },
    moduleNameMapper: app.alias,
    transformIgnorePatterns: [
        'node_modules', 'git'
    ],
    collectCoverageFrom: [
        '**/*.{js,jsx}'
    ]
};
