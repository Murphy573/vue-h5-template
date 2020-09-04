<template>
  <div class="app-container full-container"
    :class="{'hasTabbar': $route.meta.hasTabbar}">
    <!-- 全局登录 -->
    <app-login :visible="vx_gt_showLoginPanel"></app-login>
    <template v-if="loading">
      <van-loading class="loading"
        size="1rem"
        color="#2c74b9"
        vertical>加载中...</van-loading>
    </template>
    <template v-else>
      <div class="app-container-main">
        <transition name="fade"
          mode="out-in">
          <keep-alive :include="vx_gt_GetCachedViews">
            <router-view />
          </keep-alive>
        </transition>
      </div>
      <div class="app-container-footer">
        <transition name="fade"
          mode="out-in">
          <router-view name="tabbar"></router-view>
        </transition>
      </div>
    </template>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLogin from './views/login/index';

export default {
  components: { AppLogin },

  computed: {
    ...mapGetters(['vx_gt_GetCachedViews', 'vx_gt_showLoginPanel'])
  },

  data () {
    return {
      loading: true
    };
  },

  created () {
    this.appInit();
  },

  methods: {
    async appInit () {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.app-container {
  // @import '@/styles/theme/_handler.scss';

  background-color: rgba($color: #f9f9f9, $alpha: 0.9);
  // @include background_color('color-secondary');
  overflow: hidden;

  .app-container-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .app-container-footer {
    height: 0;
  }

  &.hasTabbar {
    .app-container-main {
      height: calc(100% - 50px);
    }

    .app-container-footer {
      height: 50px;
    }
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
}
</style>
