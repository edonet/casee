/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-13 20:34:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import selector, { dispatch } from 'selector';
import AppHistory from '../app-history';
import AppHeader from '../app-header';
import AppContent from '../app-content';
import AppView from '../app-view';
import * as reducers from './reducers';
import * as actions from './actions';


/**
 *****************************************
 * 容器组件
 *****************************************
 */
class AppContainer extends Component {

    /* 渲染组件 */
    render() {
        let {
                className = '', style, children, $device, ...props
            } = this.props;


        // 生成样式
        className = [$device.plotform, className].reduce(
            (name, curr) => curr ? name + ' ' + curr : name,
            'app-contianer abs box ovhd'
        );

        // 返回元素
        return (
            <div className={ className } style={ style }>
                <AppHistory />
                <AppHeader />
                <AppContent />
                <AppView path="/" { ...props }>{ children }</AppView>
            </div>
        );
    }

    /* 挂载组件 */
    componentDidMount() {
        dispatch(actions.updateDeviceInfo({ status: 'ready' }));
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default selector('$device')(AppContainer);
export { reducers, actions };
