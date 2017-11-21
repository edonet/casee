/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-21 21:46:27
 *****************************************
*/
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';


/**
 *****************************************
 * 点击组件
 *****************************************
 */
export default class AppToucher extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义属性
        this.$$status = 'pending';
        this.$$touches = [];
        this.$$tapable = true;

        // 绑定回调
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        // 生成事件对象
        this.$$events = {
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
            onTouchCancel: this.handleTouchEnd
        };
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, ...this.$$events };

        // 返回元素
        return (
            <div { ...props }>{ children }</div>
        );
    }

    /* 处理触控开始 */
    handleTouchStart({ touches }) {

        // 开始触控
        if (this.$$status === 'pending') {
            
            // 恢复点击
            this.$$tapable = touches.length < 2;

            // 获取触控点位
            this.$$touches = [].map.call(touches, touch => ({
                sx: touch.pageX, sy: touch.pageY, st: + new Date()
            }));

            // 更新状态
            this.$$status = 'start';

            return;
        }

        // 更新点位
        this.$$touches = [].map.call(touches, (touch, idx) => {
            let p = {
                    x: touch.pageX, y: touch.pageY, t: + new Date()
                },
                o = this.$$touches[idx] || p;

        });
       
    }

    /* 处理触控结束 */
    handleTouchEnd(e) {

        // 过滤无效的事件
        if (this.$$status === 'pending') {
            return;
        }

        // 更新状态
        this.$$status = 'pending';
        
        // 触发触控结束事件
        this.trigger('onTouchEnd', e);

        // 处理多点触控
        if (this.$$touches.length > 1) {

            // 处理缩放
            if (this.props.onScaleEnd) {
                // scale end
            }

        } else {

            // 处理点击
            if (this.$$tapable && this.props.onTap) {
                let { sx, sy, st, x = sx, y = sy, t = st } = this.$$touches[0],
                    tap = t - st < 1000 && Math.abs(x - sx) < 10 && Math.abs(y - sy) < 10;
    
                // 触发点击事件
                if (tap) {
                    return this.props.onTap(e, this.$$touches);
                }
            }
    
            // 触发移动结束事件
            this.trigger('onMoveEnd', e);
        }

    }

    /* 触发回调事件 */
    trigger(name, event) {
        this.props[name] && this.props[name](event, this.$$touches);
    }
}
