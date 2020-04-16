<template>
  <i :class="cmpt_class"
    :style="cmpt_style"
    v-on="$listeners" />
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
    }
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
