/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 20:40:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';
import { withRouter } from 'react-router';
import { updateAppHistory } from './model';
import history from './history';


/**
 *****************************************
 * 历史记录组件
 *****************************************
 */
class AppHistory extends Component {

    /* 即将挂载组件 */
    componentWillMount() {

        // 初始化数据
        this.componentWillReceiveProps(this.props);
    }

    /* 定义接收属性接口 */
    componentWillReceiveProps(props) {

        // 更新历史记录
        if (updateAppHistory(props)) {
            console.log('--> histories:', [...history.histories]);
        }
    }

    /* 阻止更新 */
    shouldComponentUpdate() {
        return false;
    }

    /* 渲染空元素 */
    render() {
        return null;
    }
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withRouter(AppHistory);
export { history };
