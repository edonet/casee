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
        '<rootDir>/lib/',
        app.src
    ],
    testMatch: [
        '**/?(*.)(spec|test).js?(x)'
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/jest/jsTransform.js',
        '^.+\\.css$': '<rootDir>/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/jest/fileTransform.js'
    },
    moduleNameMapper: app.alias,
    transformIgnorePatterns: [
        'node_modules'
    ],
    collectCoverageFrom: [
        '**/*.{js,jsx}'
    ]
};
