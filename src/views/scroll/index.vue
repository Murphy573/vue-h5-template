<template>
  <AppPageContainer>
    <template #header>
      <app-header title="滚动组件"
        :show-right="false">
      </app-header>
    </template>
    <template #content>
      <AppScroll ref="scroll"
        :listenScrollEvent="true"
        :hideScrollbar="false">
        <van-button @click="scrollto">滚动scrollTo</van-button>
        <van-button @click="scrollToBottom">滚动至底部</van-button>
        <van-button @click="scrollBy">再滚动50</van-button>
        <van-button @click="scrollToElement">滚动到指定元素</van-button>
        <p v-for="num of 100"
          :key="num"
          :style="{background: num===40?'red':null}"
          @click="scrollToElement">{{num}}</p>
        <div>end</div>
      </AppScroll>
    </template>
  </AppPageContainer>
</template>

<script>
export default {
  name: 'Scroll',

  data () {
    return {
    };
  },
  methods: {
    _initScroll () {
    },
    scrollto () {
      this.$refs.scroll.scrollTo(0, 10, 200);
    },
    scrollToBottom () {
      this.$refs.scroll.scrollToBottom(1000);
    },
    scrollBy () {
      this.$refs.scroll.scrollBy(0, 50, 200);
    },
    scrollToElement (e) {
      this.$refs.scroll.scrollToElement(e.target, true, -10, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
