import router from '.';
import {
  setPlatformMode,
  setWxAuth,
  setAppconfig,
  setGlobalPanelClosed,
  jump
} from './interceptors/beforeEach';

// 设置平台模式
router.beforeEach(setPlatformMode);
// 微信授权
router.beforeEach(setWxAuth);
// 设置appConfig
router.beforeEach(setAppconfig);
// 关闭全局弹窗
router.beforeEach(setGlobalPanelClosed);
// 常规拦截
router.beforeEach(jump);
