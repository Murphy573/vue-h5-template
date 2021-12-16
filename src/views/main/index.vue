<template>
  <div class="home-wrapper full-container">
    <div class="content">
      <keep-alive :include="vx_gt_GetCachedViews">
        <router-view></router-view>
      </keep-alive>
    </div>

    <div class="tabbar">
      <Tabbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tabbar from './tabbar';

export default {
  name: 'Main',

  components: { Tabbar },

  computed: {
    ...mapGetters(['vx_gt_GetCachedViews']),
  },
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    flex: 1;
    overflow: hidden;
  }

  .tabbar {
    flex: none;
    height: 50px;
  }
}
</style>
