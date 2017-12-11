/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-22 08:48:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 生成点
 *****************************************
 */
export function point(touch) {
    let p = {};

    // 获取坐标
    p.sx = p.x = touch.pageX;
    p.sy = p.y = touch.pageY;
    p.st = p.t = + new Date();

    return p;
}


/**
 *****************************************
 * 更新点位
 *****************************************
 */
export function update(p, { pageX = p.x, pageY = p.y } = {}) {
    return {
        ...p,
        ox: p.x, oy: p.y, ot: p.y,
        x: pageX, y: pageY, t: + new Date()
    };
}


/**
 *****************************************
 * 获取偏移
 *****************************************
 */
export function offset(p) {

    // 获取偏移
    p = {
        ...p,
        dx: p.x - p.ox,
        dy: p.y - p.oy,
        dt: p.t - p.ot
    };

    // 获取方向
    if (!p.direction) {
        p.direction = Math.abs(p.dx) > Math.abs(p.dy) ? 'x' : 'y';
    }

    return p;
}



/**
 *****************************************
 * 获取触控缩放
 *****************************************
 */
export function scale(p1, p2) {
    let r1 = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)),
        r2 = Math.sqrt(Math.pow(p1.ox - p2.ox, 2) + Math.pow(p1.oy - p2.oy, 2)),
        c1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
        c2 = { x: (p1.ox + p2.ox) / 2, y: (p1.oy + p2.oy) / 2 },
        s = r1 / r2;

    // 返回缩放函数
    return ({ x = 0, y = 0, scale = 1 } = {}) => ({
        x: (x - c2.x) * s + c1.x,
        y: (y - c2.y) * s + c1.y,
        scale: scale * s,
        cx: c1.x,
        cy: c1.y
    });
}
