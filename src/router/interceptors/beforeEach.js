import store from '../../store';
import CheckPermission from '@/utils/permission';

/**
 * 关闭全局弹窗面板
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export function setGlobalPanelClosed (to, from, next) {
  store.dispatch('vx_ac_SetShowLoginPanel', false);
  next();
}

/**
 * 常规拦截--跳转
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export function jump (to, from, next) {
  if (CheckPermission(to.meta.permissions) && to.matched.length) {
    next();
  }
  else {
    next({
      name: 'home',
      replace: true
    });
  }
}
