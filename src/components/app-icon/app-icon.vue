<template>
  <i class="app-icon"
    :class="cmpt_class"
    :style="cmpt_style"
    @click="$emit('click');">
    <span v-if="badge"
      class="badge">
      {{badge}}
    </span>
  </i>
</template>

<script>
import { isDef } from '@/utils/common';
import { addUnit } from '@/utils/dom';

export default {
  name: 'AppIcon',

  props: {
    name: String,
    size: [Number, String],
    color: String,
    classPrefix: {
      type: String,
      default: 'iconfont'
    },
    badge: [Number, String]
  },

  computed: {
    cmpt_class () {
      return this.classPrefix + ' ' + this.name;
    },
    cmpt_style () {
      return {
        fontSize: isDef(this.size) ? addUnit(this.size) : '',
        color: this.color
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.app-icon {
  position: relative;
  display: inline-block;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    min-width: 16px;
    padding: 0 3px;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
    line-height: 1.2;
    text-align: center;
    background-color: $--color-primary;
    border: 1px solid #fff;
    border-radius: 16px;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
}
</style>
