/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 11:17:31
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
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import { dispatch } from 'selector';
import AppContent from '../app-content';
import { updateAppDevice } from './actions';
import * as reducers from './reducers';



/**
 *****************************************
 * 代理组件
 *****************************************
 */
class AppProvider extends Component {

    /* 渲染组件 */
    render() {
        return (
            <Provider store={ this.props.store }>
                <AppHotContainer>
                    <div className="abs box">
                        <AppContent>{ this.props.children }</AppContent>
                    </div>
                </AppHotContainer>
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
export { reducers };
