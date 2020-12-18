<template>
  <button class="app-button"
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
      default: 80
    },
    fontSize: {
      type: Number,
      default: 12
    },
    height: {
      type: Number,
      default: 40
    },
    type: {
      type: String,
      default: 'primary',
      validator (v) {
        return ['primary', 'normal', 'disabled'].indexOf(v) > -1;
      }
    },
    rem: {
      type: Boolean,
      default: true
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
      let { fontSize, width, height } = this;

      let radius = null;
      if (this.rem) {
        radius = height / 75 / 2 + 'rem';
        fontSize = fontSize / 75 + 'rem';
        width = width / 75 + 'rem';
        height = height / 75 + 'rem';
      }
      else {
        radius = height / 2 + 'px';
        fontSize += 'px';
        width += 'px';
        height += 'px';
      }

      let styleData = {
        fontSize: fontSize,
        width: width,
        height: height,
        borderRadius: radius,
        color: this.color,
        background: this.background
      };

      if (this.plain) {
        styleData.border = `1px solid ${this.borderColor || this.color}`;
        styleData.background = this.background || 'transparent';
      }

      return styleData;
    },
    cmpt_getClass () {
      if (!this.plain) {
        return [this.type, { disabled: this.disabled }];
      }
      return [this.type, 'plain'];
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
.app-button {
  position: relative;
  display: inline-block;
  line-height: 1.2;
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
    cursor: not-allowed;
    opacity: 0.5;
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
    pointer-events: none;
    content: ' ';
  }

  &:not(.disabled):active::before {
    opacity: 0.1;
  }
}
</style>
