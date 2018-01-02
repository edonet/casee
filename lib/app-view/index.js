/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 11:34:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import selector from 'selector';
import { renderComponent } from '$$component';
import { mount, unmount } from '../app-content';
import { AppRoute } from '../app-router';
import matchState from './match';


/**
 *****************************************
 * 视图切换
 *****************************************
 */
const
    viewAction = {
        enter: { 'PUSH': 'right-enter', 'POP': 'left-enter', 'REPLACE': 'show' },
        leave: { 'PUSH': 'left-leave', 'POP': 'right-leave', 'REPLACE': 'hide' }
    };


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends AppRoute {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义状态
        this.state = { path: '', matched: false, show: false };

        // 定义容器
        this.$$container = document.createElement('section');
        this.$$container.className = 'hide';

        // 定义更新器
        this.$$updater = props => (action, method) => {
            let classList = ['app-view abs box'],
                { navBar = true } = props;

            console.log(`--> ${action}:`, this.state.path);

            // 更新标题
            // action === 'enter' && this.updateHeader(props);

            // 添加善样式
            navBar && classList.push('has-header');

            // 添加切换行为
            classList.push(viewAction[action][method]);

            // 更新容器
            this.$$container.className = classList.join(' ');
        };

        // 挂载容器
        mount(this.$$container);
    }

    /* 获取上下文路径 */
    getChildContext() {
        return { $$pathname: this.state.path };
    }

    /* 即将挂载组件 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新组件属性 */
    componentWillReceiveProps(props) {
        let match = matchState(this.history),
            { path, matched } = match(props.path, this.$$updater(props));


        // 更新状态
        this.setState({
            path, matched, show: matched || this.state.matched
        });
    }

    /* 判断是否需要更新 */
    shouldComponentUpdate(props, state) {
        return this.state.show !== state.show;
    }

    /* 渲染元素 */
    render() {
        return createPortal(
            this.state.show && renderComponent(this.props), this.$$container
        );
    }

    /* 卸载组件 */
    componentWillUnmount() {
        unmount(this.$$container);
        this.$$container = null;
    }
}


/**
 *****************************************
 * 定义后代上下文类型
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
export default selector('$router')(AppView);
