/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-26 14:50:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from '../app-router';
import { appendView } from '../app-content';
import { updateAppHeader } from '../app-header';


/**
 *****************************************
 * 定义转场动画
 *****************************************
 */
const
    anim = {
        enter: { 'PUSH': 'right-enter z1000', 'POP': 'left-enter', 'REPLACE': 'z1000' },
        leave: { 'PUSH': 'left-leave', 'POP': 'right-leave z1000', 'REPLACE': 'hide' }
    };


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 定义属性
        this.$$path = '';
        this.$$show = false;
        this.$$update = false;
        this.$$hasHeader = true;
        this.$$anim = '';
        this.$$matched = null;

        // 定义状态
        this.state = { matched: '' };

        // 绑定回调
        this.updateState = this.updateState.bind(this);
    }

    /* 获取上下文路径 */
    getChildContext() {
        return {
            $$pathname: this.$$path,
            $$matched: this.state.matched,
            $$matchContext: this.updateState
        };
    }

    /* 更新状态 */
    updateState(matched = '') {

        // 判断是否需要更新
        if (this.state.matched !== matched) {

            // 更新匹配状态
            this.setState({ matched });

            // 更新上级匹配状态
            if (this.props.history.matchContext) {
                this.props.history.matchContext(matched);
            }
        }
    }

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {

        // 获取视图路径
        this.$$path = props.history.resolve(props.path || './404');

        // 更新匹配状态
        this.updateState();

        // 获取匹配结果
        this.updateView(props);
    }

    /* 更新匹配状态 */
    updateView(props) {
        // debugger;
    }

    /* 更新头部 */
    updateHeader(props) {
        let {
                history: { method, length },
                title, navBar = true,
                navBack = length > 1, navLeft = null, navRight = null
            } = props;


        // 更新头部
        updateAppHeader({
            show: navBar, title, navBack, navLeft, navRight, method
        });

        // 判断是否有头部
        this.$$hasHeader = navBar;
    }

    /* 是否需要更新组件 */
    shouldComponentUpdate() {
        return this.$$shouldUpdate;
    }

    /* 渲染视图 */
    render() {
        let classList = ['app-view abs box'];

        // 添加头部样式
        this.$$hasHeader && classList.push('has-header');
        this.$$anim && classList.push(this.$$anim);

        console.log('--> render:', this.$$path, !!this.$$matched, this.props.path);

        // 渲染元素
        return appendView(
            <section className={classList.join(' ')}>
                {this.$$show && this.renderElement()}
            </section>
        );
    }

    /* 渲染元素 */
    renderElement() {
        let {
                children, render = children, component = render
            } = this.props;

        // 渲染元素
        return (
            typeof component === 'function' ? createElement(component) : component
        );
    }
}



/**
 *****************************************
 * 定义子上下文类型
 *****************************************
 */
AppView.childContextTypes = {
    $$pathname: PropTypes.string,
    $$matched: PropTypes.string,
    $$matchContext: PropTypes.func
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withRouter(AppView);
