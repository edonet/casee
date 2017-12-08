/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-08 11:09:34
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import { Component, createElement } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { appendChild, removeChild } from '../app-content';
import { withRouter } from '../app-router';
import { updateAppHeader } from '../app-header';


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 创建视图
        this.$$container = document.createElement('section');
        this.$$container.className = 'app-view abs box hide';

        // 设置状态
        this.state = { path: '', show: 'false', action: 'hide', isExact: false };

        // 绑定回调
        this.updateView = this.updateView.bind(this);

        // 添加视图
        appendChild(this.$$container);
    }

    /* 获取上下文路径 */
    getChildContext() {
        return {
            $$pathname: this.state.path
        };
    }

    /* 即将挂载 */
    componentWillMount() {

        // 处理属性
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {
        let { history, path } = props,
            matched = history.match(path, this.updateView);

        // 获取视图路径
        this.setState({
            path: matched.path,
            show: path && (matched.url || this.state.isExact) ? 1 : 0,
            isExact: matched.isExact
        });
    }

    /* 是否需要更新组件 */
    shouldComponentUpdate(props, state) {
        return (
            state.show !== this.state.show
        );
    }

    /* 渲染视图 */
    render() {

        // 打印渲染信息
        console.log('--> render:', this.state.path);

        // 执行路由更新
        this.props.history.routeWillUpdate();

        // 渲染元素
        return createPortal(
            this.state.show ? this.renderElement() : null, this.$$container
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

    /* 挂载完成 */
    componentDidMount() {
        this.componentDidUpdate();
    }

    /* 完成视图更新 */
    componentDidUpdate() {

        // 执行路由更新
        this.props.history.routeDidUpdate();
    }

    /* 更新视图 */
    updateView(action) {
        let { navBar = true } = this.props;

        console.log('--> updateView');

        // 更新容器样式
        this.$$container.className = (
            'app-view abs box ' + (navBar ? 'has-header ' : '') + action
        );

        // 显示视图
        this.state.show || this.setState({ show: 1 });

        // 更新头部
        this.state.isExact && this.updateHeader();
    }

    /* 更新头部 */
    updateHeader(props = this.props) {
        let {
                history: { method, length },
            title, navBar = true,
            navBack = length > 1, navLeft = null, navRight = null
            } = props;


        // 更新头部
        updateAppHeader({
            show: navBar, title, navBack, navLeft, navRight, method
        });
    }

    /* 即将卸载 */
    componentWillUnmount() {

        // 移除视图
        removeChild(this.$$container);
    }
}


/**
 *****************************************
 * 定义子上下文类型
 *****************************************
 */
AppView.childContextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withRouter(AppView);
