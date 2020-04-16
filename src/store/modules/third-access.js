/**
 *  第三方接入管理
 */
const THIRD_ACCESS_KEY = 'THIRD_ACCESS_COMM';

export default {
  actions: {
    // 执行登录
    async vx_ac_handleThirdLogin ({ dispatch }, thirdParam) {
      // 如果没有取到参数，不调用我们的接口
      if (!thirdParam) {
        throw new Error('登录参数不存在');
      }
      try {
        dispatch('vx_ac_Login', {
          cipherText: thirdParam,
          loginType: 1
        });
      }
      catch (error) {}
    },
    /**
     * 中途登录
     * @param {Object} loginParam 登录参数
     */
    vx_ac_midwayLogin ({ commit }, loginParam) {
      window[THIRD_ACCESS_KEY].midwayLogin(loginParam);
    },
    // 立即登录
    vx_ac_immediatelyLogin ({ commit }, routerInfo) {
      window[THIRD_ACCESS_KEY].immediatelyLogin(routerInfo);
    },
    // 返回第三方APP界面
    vx_ac_BackToThirdApp (commit) {
      window[THIRD_ACCESS_KEY].back();
    },
    // 第三方支付
    vx_ac_ToThirdPayment ({ commit }, payParams) {
      window[THIRD_ACCESS_KEY].toThirdPayment(payParams);
    },
    // 第三方分享
    vx_ac_share ({ commit }, shareInfo) {
      window[THIRD_ACCESS_KEY].share(shareInfo);
    }
  }
};
