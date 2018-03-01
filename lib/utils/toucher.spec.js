/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 17:26:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import Toucher from './toucher';
import defer from './defer';
import delay from './delay';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【toucher】', () => {
    test('测试手势触控', async () => {
        let toucher = new Toucher(),
            deferred = defer(),
            res;

        // 监听触控失败
        toucher.on('touchEnd', (e, touches) => {
            deferred.resolve(touches[0]);
        });

        // 模拟触控开始
        toucher.handleTouchStart({ touches: [{ identifier: 0, pageX: 0, pageY: 0 }]});

        // 模拟触控
        await delay(30, () => {
            toucher.handleTouch({ touches: [{ identifier: 0, pageX: 10, pageY: 10 }]});
        });

        // 模拟触控结束
        await delay(30, () => {
            toucher.handleTouchEnd({ touches: [] });
        });

        // 获取结果
        res = await deferred.promise;

        // 校验结果
        expect(res.id).toBe(0);
        expect(res.sx).toBe(0);
        expect(res.sy).toBe(0);
        expect(res.x).toBe(10);
        expect(res.y).toBe(10);
    });
});
