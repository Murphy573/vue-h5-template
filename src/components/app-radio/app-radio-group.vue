<template>
  <div class="app-radio-group"
    :style="style">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'AppRadioGroup',

  props: {
    value: null,
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
