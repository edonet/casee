/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 17:48:31
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
 * 标题组件
 *****************************************
 */
export default class AppTitle extends Component {

    /* 判断是否需要更新 */
    shouldComponentUpdate(props) {

        let t1 = this.props.value,
            t2 = props.value;

        // 无需更新
        if (t1 === t2) {
            return this.$$element = false;
        }

        // 获取元素
        if (t2) {
            if (t1) {
                this.$$element = [
                    <span key={ t1 } className="abs box slide-out">{ t1 }</span>,
                    <span key={ t2 } className="abs box slide-in">{ t2 }</span>
                ];
            } else {
                this.$$element = (
                    <span key={t2} className="abs box fade-in">{t2}</span>
                );
            }
        } else {
            this.$$element = (
                <span key={t2} className="abs box fade-out">{t2}</span>
            );
        }

        // 更新标题
        return true;
    }

    /* 渲染标题 */
    render() {
        return this.$$element || (
            <span className="abs box">{ this.props.value }</span>
        );
    }
}
