// 提示

export default {
  data() {
    return {
      toastLoadingMixin: null,
      // 是否正在处理：一般用于异步请求事件触发，防止重复触发
      handingMixin: false,
    };
  },
  methods: {
    // 打开loading
    openLoadingMixin(msg = '加载中...') {
      if (this.toastLoadingMixin) return;
      this.handingMixin = true;
      this.toastLoadingMixin = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: msg,
      });
    },
    // 关闭loading
    closeLoadingMixin() {
      this.toastLoadingMixin && this.toastLoadingMixin.clear();
      this.toastLoadingMixin = null;
      this.handingMixin = false;
    },
  },
};
