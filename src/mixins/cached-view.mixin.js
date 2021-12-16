import { setScrollPosition, getScrollPosition } from '@/utils/scroll';

/**
 * 绑定缓存滚动位置
 * @param {Function} scrollerCaller 返回一个滚动元素(HTMLElement)
 */
let cacheUid = 0;
export function BindCacheScrollMixin(scrollerCaller) {
  const positionKey = `cacheScrollPositionMixin_${cacheUid++}`;

  function set() {
    const scoller = scrollerCaller.call(this);
    if (scoller && this[positionKey]) {
      const { x = 0, y = 0 } = this[positionKey];
      setScrollPosition(scoller, x, y);
    } else {
      this[positionKey] = { x: 0, y: 0 };
    }
  }

  function record() {
    const scoller = scrollerCaller.call(this);
    if (scoller && this[positionKey]) {
      this[positionKey] = Object.freeze(getScrollPosition(scoller));
    } else {
      this[positionKey] = { x: 0, y: 0 };
    }
  }

  function destory() {
    this[positionKey] = null;
  }

  return {
    mounted: set,
    activated: set,
    deactivated: record,
    beforeDestroy: destory,
  };
}
