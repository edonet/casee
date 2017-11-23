/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 22:02:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载数据模型
 *****************************************
 */
import model from './model';


/**
 *****************************************
 * 抛出历史记录对象
 *****************************************
 */
export default {
    go,
    goBack,
    replace,
    push: go,
    pop: goBack,
    back: goBack,
    block,
    resolve,
    get length() {
        return model.histories.length;
    },
    get histories() {
        return model.histories;
    },
    get action() {
        return model.action;
    },
    get method() {
        return model.method;
    },
    get pathname() {
        return model.pathname;
    },
    get context() {
        return model.context;
    },
    get matched() {
        return model.matched;
    },
    matchPath(pathname) {
        model.matched = pathname;
    }
};


/**
 ************************************
 * 跳转到路径
 ************************************
 */
function go(path, action) {
    if (typeof path === 'string' && path !== model.pathname) {

        // 设置跳转类型
        model.params = {
            method: 'PUSH', path, ...action
        };

        // 跳转路径
        model.history.push(path);
    }
}


/**
 *************************************
 * 替换路径
 *************************************
 */
function replace(path, action) {
    if (typeof path === 'string' && path !== model.pathname) {

        // 设置跳转类型
        model.params = {
            method: 'REPLACE', path, index: model.histories.length - 1, ...action
        };

        // 替换路径
        model.history.replace(path);
    }
}



/**
 *************************************
 * 返回路径
 *************************************
 */
function goBack(step = -1, action) {

    let { history, histories } = model,
        len = histories.length;


    // 指定步数跳转
    if (typeof step === 'number') {

        // 忽略操作
        if (step === 0 || len < 2) {
            return false;
        }

        // 转换步数范围为负值
        step = step > 0 ? -step : step;

        let idx = step + len - 1;

        // 超出返回范围
        if (idx < 0) {

            // 设置跳转类型
            model.params = {
                method: 'POP', path: histories[0], index: 1, ...action
            };

            // 替换路径
            return history.go(1 - len);
        }

        // 设置跳转类型
        model.params = {
            method: 'POP', path: histories[idx], index: idx + 1, ...action
        };

        // 替换路径
        return history.go(step);
    }


    // 指定路径
    if (typeof step === 'string' && step !== model.pathname) {

        let idx = histories.lastIndexOf(step);

        // 找不到返回路径
        if (idx === -1) {

            // 设置跳转类型
            model.params = {
                method: 'REPLACE', path: step, index: 0, ...action
            };

            // 替换路径
            return history.replace(step);
        }

        // 设置跳转类型
        model.params = {
            method: 'POP', path: step, index: idx + 1, ...action
        };

        // 替换路径
        return history.go(idx - len + 1);
    }
}


/**
 *****************************************
 * 添加跳转监听
 *****************************************
 */
function block(callback) {
    model.history.block(callback);
}


/**
 *****************************************
 * 解析路过
 *****************************************
 */
function resolve(path, context = model.context) {

    // 过滤非法参数
    if (!path || typeof path !== 'string') {
        return context;
    }

    // 返回绝对路径
    if (path[0] === '/') {
        return path;
    }

    // 分割路径
    path = context.split('/').concat(path.split('/'));

    // 组合路径
    path = path.reduce((arr, curr) => {
        if (curr === '.' || !curr) {
            return arr;
        }

        if (/^\.\.+$/.test(curr)) {
            arr.pop();
        } else {
            arr.push(curr);
        }

        return arr;
    }, []);

    // 合并路径
    return '/' + path.join('/');
}
