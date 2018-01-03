/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-29 18:28:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { dispatch } from 'selector';
import AppRouter from '../app-router';
import AppContent from '../app-content';
import store, { updateAppStore } from './store';
import { updateAppDevice } from './actions';


/**
 *****************************************
 * 产品组件
 *****************************************
 */
class AppProvider extends Component {

    /* 渲染组件 */
    render() {

        // 渲染元素
        return (
            <Provider store={ store }>
                <AppContainer>
                    <div className="abs box">
                        <AppRouter />
                        <AppContent>{ this.props.children }</AppContent>
                    </div>
                </AppContainer>
            </Provider>
        );
    }

    /* 挂载完成 */
    componentDidMount() {
        dispatch(updateAppDevice({ ready: true }));
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default AppProvider;
export { updateAppStore };
