<template>
  <button class="app-btn"
    type="button"
    :class="cmpt_getClass"
    :style="cmpt_getStyle"
    @click="click">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'AppButton',
  props: {
    width: {
      type: Number,
      default: 630
    },
    fontSize: {
      type: Number,
      default: 36
    },
    height: {
      type: Number,
      default: 88
    },
    type: {
      type: String,
      default: 'primary',
      validator (v) {
        return ['primary', 'normal', 'disabled'].indexOf(v) > -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: ''
    }
  },
  computed: {
    cmpt_getStyle () {
      let f = this.fontSize / 75 + 'rem';
      let w = this.width / 75 + 'rem';
      let h = this.height / 75 + 'rem';
      let r = this.height / 75 / 2 + 'rem';
      let styleData = {
        fontSize: f,
        width: w,
        height: h,
        borderRadius: r,
        color: this.color,
        background: this.background
      };
      if (this.plain) {
        styleData.border = `1px solid ${this.borderColor || this.color}`;
        styleData.color = this.color;
        styleData.background = this.background || 'transparent';
      }
      return styleData;
    },
    cmpt_getClass () {
      if (!this.plain) {
        return [this.type, { disabled: this.disabled }];
      }
      else {
        return [];
      }
    }
  },
  methods: {
    click (e) {
      if (this.disabled) {
        e.stopPropagation();
        return;
      }
      this.$emit('click', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-btn {
  position: relative;
  display: inline-block;
  line-height: initial;
  text-align: center;
  border: none;
  transition: opacity 0.2s;

  max-width: 100% !important;

  &.primary {
    color: #ffffff;
    background: $--color-primary;
  }

  &.normal {
    background-color: #acadae;
    color: #ffffff;
    border: none;
  }

  &.disabled {
    color: #969696 !important;
    background: #f0f0f0;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
  }

  &:not(.disabled):active::before {
    opacity: 0.1;
  }
}
</style>
