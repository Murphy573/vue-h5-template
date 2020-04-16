/* 登录 */
import {
  mapGetters,
  mapActions
} from 'vuex';

const LOGIN_ORIGIN_KEY = 'LOGIN_ORIGIN_MIXIN';

export default {
  data () {
    return {
      // 是否在处理
      handling4LoginMixin: false
    };
  },
  computed: {
    ...mapGetters(['vx_gt_getToken', 'vx_gt_getUserInfo']),
    cmpt_loginTokenForWebim () {
      return this.vx_gt_getToken;
    }
  },
  methods: {
    ...mapActions([
      'vx_ac_Login',
      'vx_ac_GetUserInfo',
      'vx_ac_immediatelyLogin',
      'vx_ac_midwayLogin'
    ]),
    /**
     * 自己手动调用登录
     */
    async manuallyLoginMixin (loginParam) {
      try {
        if (!loginParam || this.handling4LoginMixin) return;
        this.handling4LoginMixin = true;

        await this.vx_ac_Login(loginParam);
        this.handling4LoginMixin = false;

        return true;
      }
      catch (error) {
        this.handling4LoginMixin = false;
        return Promise.reject(error);
      }
    },
    // 校验是否已经登录
    async checkIsLogin () {
      try {
        // 缓存登录后回调的组件name
        this.CacheOriginMixin();
        if (this.vx_gt_getToken) {
          // 登录时会同时请求用户信息，如果碰到刷新，token存在，但是用户信息丢失，此时要重新请求
          if (!this.vx_gt_getUserInfo) {
            await this.vx_ac_GetUserInfo();
          }
          return true;
        }
        else {
          return false;
        }
      }
      catch (error) {
        return false;
      }
    },
    // 立即登录
    async immediatelyLoginMixin () {
      try {
        // 存储来源
        this.CacheOriginMixin();
        // token存在即已经登录
        let ret = await this.checkIsLogin();

        if (ret) {
          // 立即执行组件回调
          this.LoginedCallMixin();
        }
        // 执行立即登录
        this.vx_ac_immediatelyLogin(this.$route);
      }
      catch (error) {}
    },
    /**
     * 中途登录
     * @param {Object} param 登录参数
     */
    async midwayLoginMixin (param) {
      try {
        // 添加重复点击登录拦截
        if (this.handling4LoginMixin) return;
        this.handling4LoginMixin = true;
        // 存储来源
        this.CacheOriginMixin();
        // token存在即已经登录
        let ret = await this.checkIsLogin();
        if (ret) {
          // 立即执行组件回调
          this.LoginedCallMixin();
          this.handling4LoginMixin = false;
          return true;
        }
        this.vx_ac_midwayLogin(param);
        this.handling4LoginMixin = false;
        return false;
      }
      catch (error) {
        this.handling4LoginMixin = false;
        return false;
      }
    },
    // 执行回调
    LoginedCallMixin () {
      // 不是当前组件调用的登录，不执行onLoginedMixin
      if (this.$options.name !== window[LOGIN_ORIGIN_KEY]) return;
      // 执行组件提供的[onLoginedMixin]方法
      this.onLoginedMixin && this.onLoginedMixin();
    },
    // 存储来源: 判断在哪里调用的登录，因为某些页面有缓存，那么登录后会某些页面的onLoginedMixin
    CacheOriginMixin () {
      // 存储来源: 组件名称
      window[LOGIN_ORIGIN_KEY] = this.$options.name || '';
    },
    // 民生跳转回来后的回调
    async CMBCCALLBACK () {
      try {
        // 存储来源
        this.CacheOriginMixin();
        // token存在即已经登录
        let ret = await this.checkIsLogin();
        if (ret) return;
        this.vx_ac_immediatelyLogin(this.$route);
      }
      catch (error) {}
    }
  },
  watch: {
    vx_gt_getToken: {
      handler (token) {
        // 执行回调
        token && this.LoginedCallMixin();
      }
    }
  },
  created () {
    // 执行民生回调;
    // this.CMBCCALLBACK();
  }
};
