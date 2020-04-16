/* 发送验证码倒计时mixin */

const SECONDS = 60;
export default {
  data () {
    return {
      // 发送验证码倒计时
      countdownMixin: SECONDS,
      // 计时器
      intervalMixin: null,
      // 是否可以重新开始计时
      canRestartIntervalMixin: true
    };
  },

  computed: {
    cmpt_resendDescMixin () {
      if (!this.canRestartIntervalMixin) {
        return `${this.countdownMixin}s后重新获取`;
      }
      return '获取验证码';
    }
  },

  beforeDestroy () {
    this.clearIntervalMixin();
  },

  methods: {
    // 开启倒计时，结束后清除定时器
    startIntervalMixin () {
      if (!this.canRestartIntervalMixin) return;
      this.canRestartIntervalMixin = false;
      this.intervalMixin = window.setInterval(() => {
        --this.countdownMixin;
        if (this.countdownMixin === 0) {
          // 计时结束后执行的操作
          this.callIntervalOverMixin && this.callIntervalOverMixin();
          this.clearIntervalMixin();
        }
      }, 1000);
    },
    // 清除定时器
    clearIntervalMixin () {
      this.countdownMixin = SECONDS;
      this.canRestartIntervalMixin = true;
      window.clearInterval(this.intervalMixin);
      this.intervalMixin = null;
    }
  }
};
