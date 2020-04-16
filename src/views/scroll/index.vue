<template>
  <AppPageContainer>
    <template #header>
      <app-header title="滚动组件"
        :show-right="false">
      </app-header>
    </template>
    <template #content>
      <Scroll ref="scroll">
        <van-button @click="scrollto">滚动scrollTo</van-button>
        <van-button @click="scrollToBottom">滚动至底部</van-button>
        <van-button @click="scrollBy">再滚动50</van-button>
        <van-button @click="scrollToElement">滚动到指定元素</van-button>
        <p v-for="num of 100"
          :key="num"
          :style="{background: num===40?'red':null}"
          @click="scrollToElement">{{num}}</p>
        <div>end</div>
      </Scroll>
    </template>
  </AppPageContainer>
</template>

<script>
import Scroll from '@/components/app-scroll/scroll';
export default {
  name: 'AppScroll',

  components: { Scroll },

  data () {
    return {
    };
  },
  methods: {
    _initScroll () {
    },
    scrollto () {
      this.$refs.scroll.scrollTo(0, 10);
    },
    scrollToBottom () {
      this.$refs.scroll.scrollToBottom();
    },
    scrollBy () {
      this.$refs.scroll.scrollBy(0, 50);
    },
    scrollToElement (e) {
      this.$refs.scroll.scrollToElement(e.target, true, -10);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
