<template>
  <button class="app-btn"
    type="button"
    :class="cmpt_getClass"
    :style="cmpt_getStyle"
    @click.stop="click()">
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
        return ['primary', 'danger', 'normal', 'cancel', 'disabled'].indexOf(v) > -1;
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
      default: '#969696'
    },
    borderColor: {
      type: String,
      default: '#969696'
    },
    background: {
      type: String,
      default: 'transparent'
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cmpt_getStyle () {
      const f = this.fontSize / 75 + 'rem';
      const w = this.width / 75 + 'rem';
      const h = this.height / 75 + 'rem';
      const r = this.height / 75 / 2 + 'rem';
      const styleData = {
        fontSize: f,
        width: w,
        height: h,
        borderRadius: r
      };
      if (this.plain) {
        if (this.border) {
          styleData.border = `1px solid ${this.borderColor}`;
        }
        styleData.color = this.color;
        styleData.background = this.background;
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
    click () {
      if (this.disabled) return;
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
.app-btn {
  font-family: "PingFangSC Regular";
  line-height: initial;
  text-align: center;
  border: none;

  max-width: 100% !important;

  &.danger {
    color: #ffffff;
    background: rgba(212, 70, 65, 1);
  }

  &.primary {
    color: #ffffff;
    background: #2c74b9;
  }

  &.normal {
    background-color: #acadae;
    color: #ffffff;
    border: none;
  }

  &.cancel {
    background-color: #fff;
    border: 1px solid #999;
    color: #999;
  }

  &.disabled {
    background: #e3e3e3 !important;
    color: #969696 !important;
  }
}
</style>
