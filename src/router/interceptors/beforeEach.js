import store from '../../store';
import { IS_WX_BROWSER, IS_IOS } from '@/utils/browser';
import MyStorage from '../../utils/storage';
import CheckPermission from '@/utils/permission';

/**
 * 设置平台模式
 * @param {*} to
 * @param {*} from
 * @param {*} next
 * @description 需放置在拦截的第一步
 */
export function setPlatformMode (to, from, next) {
  if (!store.getters.vx_gt_isSettedPlatform) {
    store.dispatch('vx_ac_setPlatform');
  }
  next();
}

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
 * 微信授权--获取openid
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export async function setWxAuth (to, from, next) {
  try {
    if (!IS_WX_BROWSER || MyStorage.sessionStorage.getItem('WX_OPENID')) {
      next();
    }
    else {
      if (to.name === 'wxAuth') {
        next();
      }
      else {
        if (to.query.code && store.getters.vx_gt_wechatAppId) {
          await store.dispatch('vx_ac_GetOpenidByWxcode', to.query.code);
          store.dispatch('vx_ac_setWxLoading', false);
          next();
        }
        else {
          const { host, pathname, search } = window.location;
          MyStorage.sessionStorage.setItem({
            WX_CALLBACK_URL: host,
            WX_CALLBACK_PATH: pathname,
            WX_CALLBACK_SEARCH: search
          });
          // next({
          //   name: 'wxAuth',
          //   replace: true
          // });
          store.dispatch('vx_ac_setWxLoading', true);
          next();
        }
      }
    }
  }
  catch (error) {
    store.dispatch('vx_ac_setWxLoading', false);
    next();
  }
}

/**
 * 设置应用全局配置appConfig
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export async function setAppconfig (to, from, next) {
  try {
    const _permissions = store.getters.vx_gt_GetPermissions;
    if (!Array.isArray(_permissions) || !_permissions.length) {
      await store.dispatch('vx_ac_getAppConfig');
    }
    next();
  }
  catch (error) {
    next();
  }
}

/**
 * 常规拦截--跳转
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export function jump (to, from, next) {
  if (CheckPermission(to.meta.permissions) && to.matched.length) {
    // 设置微信签名url,ios机型在首次进入设置一次签名url，之后不变，安卓则每次跳转页面设置一次签名url
    if (IS_WX_BROWSER) {
      if (IS_IOS) {
        !store.getters.vx_gt_GetWechatSignUrl &&
          store.dispatch(
            'vx_ac_SetWechatSignUrl',
            window.location.origin + to.fullPath
          );
      }
      else {
        store.dispatch(
          'vx_ac_SetWechatSignUrl',
          window.location.origin + to.fullPath
        );
      }
    }
    next();
  }
  else {
    next({
      name: 'home',
      query: { ...to.query },
      replace: true
    });
  }
}
