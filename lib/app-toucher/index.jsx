/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-11 15:13:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';
import { renderElement } from '$$utils/component';
import toucher from './toucher';


/**
 *****************************************
 * 触控组件
 *****************************************
 */
export default class AppToucher extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 生成触控对象
        this.$$toucher = toucher(props);
    }

    /* 渲染组件 */
    render() {
        let {
                onTouchStart, onTouchMove, onTouchEnd,
                onMoveStart, onMove, onMoveEnd,
                onScaleStart, onScale, onScaleEnd,
                onTap, ...rest
            } = this.props;


        // 更新触控事件
        this.$$toucher.update({
            onTouchStart, onTouchMove, onTouchEnd,
            onMoveStart, onMove, onMoveEnd,
            onScaleStart, onScale, onScaleEnd,
            onTap
        });

        // 渲染元素
        return renderElement({ ...rest, ...this.$$toucher.events });
    }
}
