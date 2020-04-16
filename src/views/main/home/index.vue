<template>
  <AppPageContainer v-title="title">
    <template #header>
      <app-header :title="title"
        :show-right="false"
        :show-left="false">
      </app-header>
    </template>
    <template #content>
      <div>
        主页
        <van-button @click="$router.push({name:'scroll'})">跳转到scroll</van-button>
      </div>
    </template>
  </AppPageContainer>
</template>

<script>
import CachedViewMixin from '@/mixins/cached-view.mixin';

export default {
  name: 'MainHome',

  mixins: [CachedViewMixin],

  data () {
    return {
      title: '主页'
    };
  },

  methods: {
    // 提供给cached-view.mixin调用
    canCachedViewMixin () {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
