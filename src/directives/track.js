import { isFunction } from '../utils/common';
import Vue from 'vue';
/**
 * 页面元素触发追踪统计
 * 使用方式：v-track:click="expression"
 * :click可以替换成任意可监听的dom事件（不传默认为click）
 * expression有两种情况：
 * 1、传入此对象{category, name, value}：
 *  category：页面名称（比如首页、店铺详情页...）
 *  name：点击的按钮名称
 *  value：尚未启用
 * 2、传入返回此对象{category, name, value}的自定义方法
 */
const track = {
  bind: function (el, binding) {
    let _arg = binding.arg || 'click';

    el.addEventListener(_arg, () => {
      let category, name, value;
      if (isFunction(binding.value)) {
        ({ category, name, value } = binding.value());
      }
      else {
        ({ category, name, value } = binding.value);
      }
      Vue.prototype.$matomo.trackEvent(category, _arg, name, value);
    });
  }
};

export default function (Vue) {
  Vue.directive('track', track);
}
