/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-26 15:47:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import model, { updateAppHistory } from './model';
import * as reducers from './reducers';


/**
 *****************************************
 * 更新路由状态
 *****************************************
 */
function updateRouterState(state) {
    let {
            pathname, step = -1,
            action = 'PUSH', method = action
        } = state,
        { history, histories } = model,
        len = histories.length;


    // 忽略同一跳转
    if (pathname === histories[len - 1]) {
        return false;
    }

    // 跳转到路径
    if (action === 'PUSH') {
        model.state = { pathname, action, method };
        return history.push(pathname);
    }

    // 替换路径
    if (action === 'REPLACE') {
        model.state = { pathname, action, method };
        return history.replace(pathname);
    }

    // 返回路径
    if (action === 'POP') {

        // 返回指定路径
        if (pathname) {
            let idx = histories.lastIndexOf(pathname);

            if (idx > -1) {
                model.state = { pathname, action, method };
                return history.goBack(idx + 1 - len);
            }

            // 定义跳转状态
            model.state = {
                pathname, action, method,
                next: () => {
                    model.state = { pathname, action: 'REPLACE', method };
                    history.replace(pathname);
                }
            };

            // 返回
            history.goBack(1 - len);
        }

        // 返回指定步数
        if (step) {

            // 修复参数
            step = step > 0 ? - step : step;

            // 判断是否超出范围
            step = len + step < 1 ? 1 - len : step;

            // 设置跳转状态
            model.state = { pathname: histories[len + step - 1], action, method };
            history.goBack(step);
        }
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default model.history;
export {
    reducers, updateAppHistory, updateRouterState
};
