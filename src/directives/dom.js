/* 重置微信浏览器下：input获得焦点页面不回弹 */
export function resetBodyPosition (Vue) {
  let timer = null;

  Vue.directive('resetBodyPosition', {
    bind: function (el) {
      // 如果不是微信浏览器，直接返回
      if (!/MicroMessenger/gi.test(navigator.userAgent)) return;

      el.addEventListener('blur', () => {
        timer = setTimeout(() => {
          window.scroll(0, 0);
        }, 20);
      });
      el.addEventListener('focus', () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      });
    }
  });
}

// 设置浏览器标题
export function title (Vue) {
  const _setTile = title => (document.title = title || 'U商城');

  Vue.directive('title', {
    inserted (el, binding) {
      _setTile(binding.value);
    },
    update (el, binding) {
      _setTile(binding.value);
    }
  });
}
