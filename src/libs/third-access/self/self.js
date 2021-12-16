/**
 * 自己的api
 */
import store from '@/store/index';
import { getUrlParam } from '@/utils/url';

window.MALL_SELF = {
  // 登录
  midwayLogin() {
    store.dispatch('vx_ac_SetShowLoginPanel', true);
  },
  // 立即登录
  immediatelyLogin(routerInfo) {
    const _params = getUrlParam('params') || routerInfo.query.params || '';

    _params && store.dispatch('vx_ac_handleThirdLogin', _params);
  },
};
