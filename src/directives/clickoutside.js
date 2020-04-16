/* 点击dom外指令 */

import { isFunction } from '../utils/common';
import { on, off } from '../utils/dom';

const context = '_clickoutsideContext_';

/**
 * 使用方式：
 * v-clickoutside:click="function"
 */
const clickoutside = {
  bind (el, binding) {
    const handler = event => {
      if (!el.contains(event.target)) {
        isFunction(el[context].callback) && el[context].callback();
      }
    };

    el[context] = {
      handler,
      callback: binding.value,
      arg: binding.arg || 'click'
    };

    on(document, el[context].arg, handler);
  },

  update (el, binding) {
    el[context].callback = binding.value;
  },

  unbind (el) {
    off(document, el[context].arg, el[context].handler);
  }
};

export default function (Vue) {
  Vue.directive('clickoutside', clickoutside);
}
