<template>
  <label class="app-radio"
    :style="cmpt_itemStyle"
    @click="handleClick">
    <span class="app-radio-icon">
      <i class="iconfont"
        :class="[checked ?'icondanxuan_xuanzhong':'icondanxuan_weixuanzhong']"
        :style="cmpt_iconStyle"></i>
    </span>
    <span class="app-radio-label font-family-regular">
      <slot></slot>
    </span>
  </label>
</template>

<script>

export default {
  name: 'AppRadio',

  props: {
    label: [String, Number],
    value: null,
    disabled: Boolean,
    iconColor: {
      type: Object,
      default () {
        return {
          checked: '#2C74B9',
          notChecked: '#666666'
        };
      }
    }
  },

  data () {
    return {
      parent: null
    };
  },

  computed: {
    currentValue: {
      get () {
        return this.parent ? this.parent.value : this.value;
      },
      set (val) {
        (this.parent || this).$emit('input', val);
      }
    },
    checked () {
      return this.currentValue === this.label;
    },
    isDisabled () {
      return this.parent
        ? this.parent.disabled || this.disabled
        : this.disabled;
    },
    gutter () {
      return this.parent ? this.parent.gutter : 0;
    },
    cmpt_itemStyle () {
      const paddingLeft = this.gutter / 2 / 75 + 'rem', paddingRight = paddingLeft;
      return {
        paddingLeft,
        paddingRight
      };
    },
    cmpt_iconStyle () {
      return {
        color: this.checked ? this.iconColor.checked : this.iconColor.notChecked
      };
    }
  },

  created () {
    this.findParent('AppRadioGroup');
  },

  methods: {
    findParent (name) {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === name) {
          this.parent = parent;
          break;
        }
        parent = parent.$parent;
      }
    },
    handleClick () {
      if (!this.isDisabled) {
        this.currentValue = this.label;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-radio {
  color: #333333;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;

  &-icon {
    font-size: 0.346667rem /* 26/75 */;
  }

  &-label {
    padding-left: 0.133333rem /* 10/75 */;
    color: #333333;
    font-size: $--size-28;
  }
}
</style>
