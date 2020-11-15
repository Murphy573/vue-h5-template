import router from '.';
import {
  setGlobalPanelClosed,
  jump
} from './interceptors/beforeEach';

// 关闭全局弹窗
router.beforeEach(setGlobalPanelClosed);
// 常规拦截
router.beforeEach(jump);
