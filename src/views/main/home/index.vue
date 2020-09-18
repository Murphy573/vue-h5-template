<template>
  <AppPageContainer v-title="title">
    <template #header>
      <app-header :title="title"
        :show-right="false"
        :show-left="false">
      </app-header>
    </template>
    <template #content>
      <div class="home-wrapper full-container">
        <span>主页</span>
        <van-button @click="$router.push({name:'scroll'})">跳转到scroll</van-button>
        <van-button @click="$router.push({name:'fall'})">跳转到waterfall</van-button>
        <ul class="app-grid">
          <li v-for="i of 3"
            :key="i"
            class="app-grid-item">

          </li>
        </ul>
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
.red {
  color: red;
}
.home-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 30px;

  > span {
    margin-left: 100px;
    background: $--color-golden;
  }

  ::v-deep {
    .van-button {
      font-size: 20px !important;
    }
  }

  .app-grid {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    > .app-grid-item {
      width: 33.333333%;
      height: 100px;
      background: $--color-golden;
      margin-bottom: 10px;

      &:nth-child(1) {
        flex-shrink: 1;
        flex-grow: 1;
        width: 50px;
      }
      &:nth-child(2) {
        flex-shrink: 2;
        flex-grow: 2;
        width: 100px;
        background: $--color-red;
      }
      &:nth-child(3) {
        flex-grow: 3;
        flex-shrink: 3;
        width: 150px;
      }
    }
  }
}
</style>
