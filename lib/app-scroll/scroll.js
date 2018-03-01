/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-11 11:18:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import EventEmitter from '../utils/event';
import { rAF, updater, animate, easing } from '../utils/animate';
import { transform, translate } from '../utils/style';
import Toucher from '../utils/toucher';


/**
 *****************************************
 * 滚动对象
 *****************************************
 */
export default class Scroll extends EventEmitter {

    /* 初始化对象 */
    constructor(el, options) {
        super();

        // 定义配置
        this.$$options = {
            startX: 0, startY: 0,
            scrollX: false, scrollY: true,
            overflow: 100
        };

        // 定义手势
        this.$$toucher = new Toucher();
        this.$$update = updater();
        this.$$animate = null;
        this.$$pending = true;
        this.$$mounted = false;

        // 定义尺寸
        this.$$view = { width: 0, height: 0 };
        this.$$size = { width: 0, height: 0 };

        // 定义位置
        this.$$x = 0;
        this.$$y = 0;
        this.$$minX = 0;
        this.$$minY = 0;
        this.$$maxX = 0;
        this.$$maxY = 0;

        // 挂载对象
        this.mountTo(el, options);
    }

    /* 挂载到对象 */
    mountTo(el, options) {
        if (!el || this.$$mounted) {
            return false;
        }

        // 获取元素
        this.$$container = typeof el === 'string' ? document.getElementById(el) : el;
        this.$$scroller = this.$$container.childNodes[0];

        // 绑定事件回调
        this.$$transform = this.$$transform.bind(this);

        // 初始化事件
        this.$$unbind = this.$$toucher.bindTo(this.$$container);

        // 更新挂载标识
        this.$$mounted = true;

        // 监听手势
        this.handleTouchStart();
        this.handleTouch();
        this.handleTouchEnd();

        // 刷新对象
        this.refresh(options);
    }

    /* 刷新对象 */
    refresh(options) {

        // 合并配置
        if (options) {
            this.$$options = { ...this.$$options, ...options };
        }

        // 更新视图
        this.$$container && rAF(() => {

            // 获取视图尺寸
            this.$$view = {
                width: this.$$container.clientWidth,
                height: this.$$container.clientHeight
            };

            // 获取滚动尺寸
            this.$$size = {
                width: this.$$scroller.clientWidth,
                height: this.$$scroller.clientHeight
            };

            // 获取最小值
            this.$$minX = this.$$options.minX || 0;
            this.$$minY = this.$$options.minY || 0;

            // 获取最大值
            this.$$maxX = Math.max(this.$$minX, Math.min(this.$$size.width - this.$$view.width));
            this.$$maxY = Math.max(this.$$minY, Math.min(this.$$size.height - this.$$view.height));

            // 滚动到初始化位置
            this.scrollTo(this.$$options.startX, this.$$options.startY);
        });
    }

    /* 重置位置 */
    reset() {
        let dx = this.$$x < 0 ? this.$$minX - this.$$x : this.$$x > this.$$maxX ? this.$$maxX - this.$$x : 0,
            dy = this.$$y < 0 ? this.$$minY - this.$$y : this.$$y > this.$$maxY ? this.$$maxY - this.$$y : 0;

        // 滚动位置
        this.scrollBy(dx, dy, 350);
    }

    /* 监听手势开始 */
    handleTouchStart() {
        this.$$toucher.on('touchStart', (e, touches) => {

            // 停止动画
            this.$$animate && this.$$animate.stop();

            // 执行开始回调
            if (touches.length === 1) {
                this.emit('scrollStart', this);
                this.$$pending = false;
            }
        });
    }

    /* 监听手势 */
    handleTouch() {
        this.$$toucher.on('touchMove', (e, touches) => {
            let [{ x, ox, y, oy }] = touches;

            // 更新【x】位置
            this.translateBy(ox - x, oy - y);
        });
    }

    /* 监听手势结束 */
    handleTouchEnd() {
        this.$$toucher.on('touchEnd', (e, touches) => {
            if (!e.touches || e.touches.length < 1) {
                let [{ x, ox, y, oy, t, ot }] = touches,
                    a = .003,
                    dt = t - ot || 1,
                    sx = (ox - x) / dt,
                    sy = (oy - y) / dt,
                    dx = .5 * sx * Math.abs(sx) / a,
                    dy = .5 * sy * Math.abs(sy) / a;

                // 获取【X】边界
                if (dx < 0) {
                    dx = Math.max(dx, this.$$minX - this.$$x - this.$$options.overflow);
                } else {
                    dx = Math.min(dx, this.$$maxX - this.$$x + this.$$options.overflow);
                }

                // 获取【Y】边界
                if (dy < 0) {
                    dy = Math.max(dy, this.$$minY - this.$$y - this.$$options.overflow);
                } else {
                    dy = Math.min(dy, this.$$maxY - this.$$y + this.$$options.overflow);
                }

                // 获取动画时间
                dt = Math.max(sx && 2 * dx / sx, sy && 2 * dy / sy);

                // 执行动画
                this.scrollBy(dx, dy, dt);
            }
        });
    }

    /* 滚动距离 */
    scrollBy(dx, dy, duration = 0) {
        if (dx || dy) {

            // 开始滚动
            this.$$pending && this.emit('scrollStart', this);
            this.$$pending = false;

            // 使用动画
            if (duration) {
                let sx = this.$$x,
                    sy = this.$$y,
                    fn = easing('ease-out');

                // 执行动画
                this.$$animate = animate(duration, r => {

                    // 更新位置
                    this.translateTo(sx + dx * fn(r), sy + dy * fn(r));

                    // 结束滚动
                    r >= 1 && this.reset();
                });
            } else {
                rAF(() => {
                    this.translateTo(this.$$x + dx, this.$$y + dy);
                    this.reset();
                });
            }
        } else if (!this.$$pending) {
            rAF(() => {
                this.emit('scrollEnd', this);
                this.$$pending = true;
            });
        }
    }

    /* 滚动到位置 */
    scrollTo(x, y, duration = 0) {
        this.scrollBy(x - this.$$x, y - this.$$y, duration);
    }

    /* 更新距离 */
    translateBy(dx, dy) {
        if (dx || dy) {
            this.translateTo(this.$$x + dx, this.$$y + dy);
        }
    }

    /* 更新到位置 */
    translateTo(x, y) {
        this.$$translate(x, y);
        this.$$transform();
    }

    /* 更新位置 */
    $$translate(x, y) {

        // 更新【x】位置
        if (this.$$options.scrollX) {

            // 处理溢出
            if (this.$$x < this.$$minX && x < this.$$x) {
                x = this.$$x + (x - this.$$x) * this.$$overrate(this.$$minX - x);
            } else if (this.$$x > this.$$maxX && y > this.$$x) {
                x = this.$$x + (x - this.$$x) * this.$$overrate(x - this.$$maxX);
            }

            // 更新位置
            this.$$x = this.$$options.startX = x;
        }

        // 更新【y】位置
        if (this.$$options.scrollY) {

            // 处理溢出
            if (this.$$y < this.$$minY && y < this.$$y) {
                y = this.$$y + (y - this.$$y) * this.$$overrate(this.$$minY - y);
            } else if (this.$$y > this.$$maxY && y > this.$$y) {
                y = this.$$y + (y - this.$$y) * this.$$overrate(this.$$y - this.$$maxY);
            }

            // 更新位置
            this.$$y = this.$$options.startY = y;
        }
    }

    /* 变换位置 */
    $$transform() {

        // 更新样式
        transform(this.$$scroller, translate(- this.$$x + 'px', - this.$$y + 'px'));

        // 执行滚动回调
        this.emit('scroll', this);
    }

    /* 获取溢出衰减率 */
    $$overrate(distance) {
        return 1 - Math.min(this.$$options.overflow, distance) / this.$$options.overflow;
    }

    /* 销毁对象 */
    destroy() {
        this.off();
        this.$$unbind();
        this.$$container = null;
        this.$$scroller = null;
        this.$$toucher = null;
        return null;
    }
}
