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

/**
 * 动画方法， 将动画css加入到元素上，返回promise提供执行后续操作（将动画重置）
 * @param {HTMLElement} el 当前被执行动画的元素
 * @param {Array} animationList 动画列表
 * @param {Function} callback 动画执行完后的回调函数
 */
export async function runAnimation (el, animationList = [], callback) {
  if (!el || !Array.isArray(animationList) || !animationList.length) return;

  let playFn = function (animation) {
    return new Promise(resolve => {
      const { name, duration, infinite, interationCount = 1, delay } = animation;

      el.style.animationName = name;
      el.style.animationDuration = `${duration}s`;
      // 如果是循环播放就将循环次数置为1，这样有效避免编辑时因为预览循环播放组件播放动画无法触发animationend来暂停组件动画
      el.style.animationIterationCount = infinite ? 'infinite' : interationCount;
      el.style.animationDelay = `${delay}s`;
      el.style.animationFillMode = 'both';

      let handleAnimationEnd = function (event) {
        event.stopPropagation();
        el.removeEventListener('animationend', handleAnimationEnd, false);
        resolve();
      };

      el.addEventListener('animationend', handleAnimationEnd, false);
    });
  };

  for (let i = 0, len = animationList.length; i < len; i++) {
    await playFn(animationList[i]);
  }
  if (callback) {
    callback();
  }
}
