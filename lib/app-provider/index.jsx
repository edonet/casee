/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-11 11:31:49
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
import store from './store';
import use from './index.scss';


/**
 *****************************************
 * provider
 *****************************************
 */
export default class AppProvider extends Component {

    /* 渲染组件 */
    render() {
        return (
            <Provider store={ store }>
                <AppContainer>
                    <div className={ use('abs', 'box', 'container') }>
                        { this.props.children }
                    </div>
                </AppContainer>
            </Provider>
        );
    }
}
