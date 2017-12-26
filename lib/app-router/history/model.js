/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 15:42:34
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createHistory from 'history/createBrowserHistory';
import { dispatch } from 'selector';
import { updateAppRouter } from './actions';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    history: createHistory({ forceRefresh: false }),
    histories: [],
    state: null
};


/**
 *****************************************
 * 监听路径变化
 *****************************************
 */
model.history.listen(updateAppHistory);


/**
 *****************************************
 * 更新路由历史
 *****************************************
 */
function updateAppHistory(location, action = 'REPLACE') {
    let pathname = location.pathname,
        state = model.state || {},
        histories = model.histories,
        method = action,
        ignore = false;


    // 忽略同一跳转
    if (pathname === histories[histories.length - 1]) {
        return false;
    }

    // 获取跳转状态
    if (state.pathname === pathname && state.action === action) {
        method = state.method;
        ignore = state.ignore;
    }

    // 更新路由记录
    switch (action) {
        case 'PUSH':
            histories = histories.concat([pathname]);
            break;
        case 'REPLACE':
            histories = histories.slice(0, -1).concat([pathname]);
            break;
        case 'POP':
            histories = histories.slice(0, Math.max(0, histories.lastIndexOf(pathname)));
            break;
        default:
            ignore = true;
            break;
    }

    // 更新数据模型
    model.histories = histories;
    model.state = null;

    // 更新状态
    ignore || dispatch(updateAppRouter(
        { pathname, method, histories, length: histories.length }
    ));
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default model;
export { updateAppHistory };
