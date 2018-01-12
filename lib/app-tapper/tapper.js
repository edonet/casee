/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-27 17:38:13
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import Toucher from './toucher';


/**
 *****************************************
 * 生成点击事件
 *****************************************
 */
export default function tapper(callback) {
    let toucher = new Toucher();


    // 监听触控结束
    toucher.on('onTouchEnd', (e, touches) => {

        // 判断是否可点击
        if (toucher.tapable()) {
            let { x, y, t, sx, sy, st } = touches[0],
                dx = Math.abs(x - sx),
                dy = Math.abs(y - sy),
                dt = t - st;

            // 判断点击
            if (dx < 10 && dy < 10 && dt < 1000) {
                callback && callback(e, touches);
            }
        }
    });

    // 返回事件监听
    return toucher;
}
