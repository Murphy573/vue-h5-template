<template>
  <ul class="quick-entry"
    :style="cmpt_finalData.css">
    <li v-for="(item, index) of cmpt_finalData.sectionItemList"
      :key="index"
      :style="item.css"
      class="item"
      @click="pageJumpMixin(item.url)">
      <AppImage width="30"
        height="30"
        :src="item.imgSrc"
        style="margin-bottom: 4px;" />
      <span>{{item.itemDesc}}</span>
    </li>
  </ul>
</template>

<script>
import Mixin from './mixin.js';

export default {
  name: 'QuickEntry',

  mixins: [Mixin]

};
</script>

<style lang="scss" scoped>
.quick-entry {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  height: max-content !important;
  overflow: hidden;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    flex: none;
    margin: 10px 0 !important;

    > span {
      font-size: 14px;
      color: #333;
      text-align: center;
    }
  }
}
</style>
