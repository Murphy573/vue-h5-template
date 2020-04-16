<template>
  <div class="app-checkbox-group"
    :style="style">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'AppCheckBoxGroup',

  props: {
    max: Number,
    value: Array,
    disabled: Boolean,
    gutter: {
      type: Number,
      default: 40
    }
  },

  computed: {
    style () {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2 / 75}rem`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  watch: {
    value (value) {
      this.$emit('change', value);
    }
  }
};
</script>
