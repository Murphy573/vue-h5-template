/* 滚动位置记录 */
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      // 记录的滚动位置
      recordSrollTopMixin: 0,
      // 滚动容器
      scrollRefMixin: 'scrollRefMixin'
    };
  },

  activated () {
    this.$refs[this.scrollRefMixin] &&
      (this.$refs[this.scrollRefMixin].scrollTop = this.recordSrollTopMixin);
  },

  deactivated () {
    this.recordSrollTopMixin = this.$refs[this.scrollRefMixin]
      ? this.$refs[this.scrollRefMixin].scrollTop
      : 0;
  },

  beforeRouteLeave (to, from, next) {
    // 组件中提供该方法，用来判断是否应该添加到缓存：默认为组件name
    if (this.canCachedViewMixin && this.canCachedViewMixin(to, from)) {
      this.vx_ac_AddCachedView(this.$options.name);
    }
    else {
      this.vx_ac_RemoveCachedView(this.$options.name);
    }
    next();
  },

  methods: {
    ...mapActions(['vx_ac_AddCachedView', 'vx_ac_RemoveCachedView'])
  }
};
