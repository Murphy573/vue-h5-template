import { on, off } from '../utils/dom';

/* 重置微信浏览器下：input获得焦点页面不回弹 */
export function resetBodyPosition (Vue) {
  let timer = null;
  const blurHandler = () => {
    timer = setTimeout(() => {
      window.scroll(0, 0);
    }, 20);
  };
  const focusHandler = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const findTarget = el => {
    // 如果不是微信浏览器，直接返回
    if (!/MicroMessenger/gi.test(navigator.userAgent)) return;
    if (
      el.tagName.toUpperCase() !== 'INPUT' &&
      el.tagName.toUpperCase() !== 'TEXTAREA'
    ) {
      let _input = el.querySelector('input'),
        _textarea = el.querySelector('textarea');

      el = _input || _textarea;
    }
    return el;
  };

  Vue.directive('resetBodyPosition', {
    bind: function (el) {
      el = findTarget(el);
      if (!el) return;
      on(el, 'blur', blurHandler);
      on(el, 'focus', focusHandler);
    },
    unbind (el) {
      el = findTarget(el);
      if (!el) return;
      off(el, 'blur', blurHandler);
      off(el, 'focus', focusHandler);
    }
  });
}

// 设置浏览器标题
export function title (Vue) {
  const _setTile = title => (document.title = title || '');

  Vue.directive('title', {
    inserted (el, binding) {
      _setTile(binding.value);
    },
    update (el, binding) {
      _setTile(binding.value);
    }
  });
}
