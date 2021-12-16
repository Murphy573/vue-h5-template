<template>
  <div
    class="app-image"
    :class="{ round: round }"
    :style="style"
    @click="onClick">
    <img
      v-if="lazyload"
      v-lazy="src"
      :alt="alt"
      :style="cmpt_imgStyle"
      class="img" />
    <img v-else :src="src" :alt="alt" :style="cmpt_imgStyle" class="img" />
  </div>
</template>

<script>
import { isDef } from '@/utils/common';
import { addUnit } from '@/utils/dom';

export default {
  name: 'AppImage',

  props: {
    src: String,
    fit: String,
    alt: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyload: Boolean,
    // 默认固定长宽比
    fixedRadio: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    cmpt_imgStyle() {
      const imgStyle = {};
      if (!this.fixedRadio) {
        imgStyle.width = '100%';
        imgStyle.height = '100%';
      }
      imgStyle.objectFit = this.fit;

      return imgStyle;
    },
    style() {
      const style = {};

      if (isDef(this.width)) {
        style.width = addUnit(this.width);
      }

      if (isDef(this.height)) {
        style.height = addUnit(this.height);
      }

      if (isDef(this.radius)) {
        style.borderRadius = addUnit(this.radius);
      }

      return style;
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

  &.round {
    overflow: hidden;
    border-radius: 50%;

    .img {
      border-radius: inherit;
    }
  }
}
</style>
