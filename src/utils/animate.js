import Easying from './easing';
import { raf, cancelRaf } from './raf';

const COMPLETE_EASING = 1;

/**
 * 创建动画函数
 * @param {Number} duration 动画时长
 * @param {Function} easingFn easing.js中的动画函数
 * @returns {Function} AnimateFn 返回动画执行函数
 */
export function createAnimate (duration, easingFn = Easying.easeInOutQuad) {
  // 起始时间
  const startTime = Date.now();
  // 结束时间
  const destTime = startTime + duration;
  // 定时器id
  let timer = null;

  /**
   * 动画执行函数
   * @param {Function} callback 回调函数
   */
  const fn = callback => {
    // 步骤调用函数
    const step = () => {
      let now = Date.now();
      // 动画执行完毕
      if (now >= destTime) {
        callback(COMPLETE_EASING);
        cancelRaf(timer);
        return;
      }

      now = (now - startTime) / duration;
      // easing动画返回的系数永远小于1
      const easing = easingFn(now);
      callback(easing);
      timer = raf(step);
    };

    cancelRaf(timer);
    step();
  };
  return fn;
}
