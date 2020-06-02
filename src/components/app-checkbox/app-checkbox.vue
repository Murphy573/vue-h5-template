<template>
  <label class="app-checkbox"
    :style="cmpt_itemStyle"
    @click="toggle">
    <span class="app-checkbox-icon">
      <i class="iconfont"
        :class="[checked ?'icongouxuan1':'iconquxiaogouxuan']"
        :style="cmpt_iconStyle"></i>
    </span>
    <span class="app-checkbox-label font-family-regular">
      <slot></slot>
    </span>
  </label>
</template>

<script>

export default {
  name: 'AppCheckbox',

  props: {
    label: [String, Number, Boolean],
    trueLabel: [String, Number],
    falseLabel: [String, Number],
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
    checked: {
      get () {
        if (this.parent) {
          return this.parent.value.indexOf(this.label) !== -1;
        }
        let _value = !!this.value;
        if (this.trueLabel !== undefined) {
          _value = this.value === this.trueLabel;
        }
        return _value;
      },

      set (val) {
        if (this.parent) {
          this.setParentValue(val);
        }
        else {
          // 单独使用时：判断trueLabel falseLabel
          let _value;
          if (val) {
            _value = this.trueLabel === undefined ? true : this.trueLabel;
          }
          else {
            _value = this.falseLabel === undefined ? false : this.falseLabel;
          }
          this.$emit('input', _value);
        }
      }
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

  watch: {
    value (val) {
      this.$emit('change', val);
    }
  },

  created () {
    this.findParent('AppCheckBoxGroup');
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
    toggle () {
      if (!this.isDisabled) {
        this.checked = !this.checked;
      }
    },
    setParentValue (val) {
      const parent = this.parent;
      const value = parent.value.slice();

      if (val) {
        if (parent.max && value.length >= parent.max) {
          return;
        }

        if (value.indexOf(this.label) === -1) {
          value.push(this.label);
          parent.$emit('input', value);
        }
      }
      else {
        const index = value.indexOf(this.label);

        if (index !== -1) {
          value.splice(index, 1);
          parent.$emit('input', value);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-checkbox {
  color: #333333;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;

  &-icon {
    font-size: $--size-30;
  }

  &-label {
    padding-left: 0.133333rem /* 10/75 */;
    color: #333333;
    font-size: $--size-28;
  }
}
</style>
