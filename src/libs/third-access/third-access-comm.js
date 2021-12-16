/**
 * 第三方统一接入
 */
import './self/self';
import './chinalife/chinalife';
import { CHANNEL_NO_ENV, CHANNEL_NO_CURRENT } from '@/configs/channel';

window.THIRD_ACCESS_COMM = {
  /**
   * 第三方中途登陆
   * @param {Object} params 登录参数
   */
  midwayLogin(params) {
    this.ENV.midwayLogin(params);
  },
  /**
   * 第三方立即登录：进入页面后自动登录
   * @param {Object} routerInfo 路由信息
   */
  immediatelyLogin(routerInfo) {
    this.ENV.immediatelyLogin(routerInfo);
  },
  /**
   * 返回第三方APP界面
   */
  back() {
    this.ENV.back();
  },
  /**
   * 第三方分享
   * @param {Object} shareInfo 分享信息
   */
  share(shareInfo) {
    this.ENV.share(shareInfo);
  },
  /**
   * 第三方支付
   * @param {Object} paymentInfo 支付信息
   */
  toThirdPayment(paymentInfo) {
    this.ENV.payment(paymentInfo);
  },
  /**
   * 获取第三方支付回调参数
   * @param {Obejct} routerInfo 路由信息
   */
  getPaymentCallBackParams(routerInfo) {
    return this.ENV.getPaymentCallBackParams(routerInfo);
  },
  // 获取第三方渠道接入对象
  ENV: (() => {
    const _env = window[CHANNEL_NO_ENV[CHANNEL_NO_CURRENT]];
    if (!_env) throw new Error('third-access-comm：没有找到对应渠道');
    return _env;
  })(),
};
