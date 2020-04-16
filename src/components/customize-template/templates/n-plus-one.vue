<template>
  <ul class="n-plus-one"
    :style="cmpt_finalData.css">
    <li v-for="(item, index) of cmpt_finalData.sectionItemList"
      :key="index"
      :style="item.css"
      class="item"
      @click="pageJumpMixin(item.url)">
      <AppImage :src="item.imgSrc" />
    </li>
  </ul>
</template>

<script>
import Mixin from './mixin.js';

export default {
  name: 'NPlusOne',

  mixins: [Mixin]
};
</script>

<style lang="scss" scoped>
.n-plus-one {
  width: 100%;
  height: 80px;
  overflow: hidden;

  display: flex;

  > .item {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>
