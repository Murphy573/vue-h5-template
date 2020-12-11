<template>
  <span class="app-icon"
    v-on="$listeners">
    <template v-if="!cmpt_isSvg">
      <i :class="cmpt_name"
        :style="cmpt_style">
      </i>
    </template>
    <template v-else>
      <svg class="svg-icon"
        :style="cmpt_style"
        aria-hidden="true">
        <use :href="cmpt_name" />
      </svg>
    </template>
    <span v-if="badge"
      :style="cmpt_badgeStyle"
      class="badge">
      {{badge}}
    </span>
  </span>
</template>

<script>
import { isDef } from '@/utils/common';
import { addUnit } from '@/utils/dom';

export default {
  name: 'AppIcon',

  props: {
    type: {
      type: String,
      default: 'icon',
      validator (v) {
        return ['icon', 'svg'].includes(v);
      }
    },
    name: String,
    size: [Number, String],
    color: String,
    classPrefix: {
      type: String,
      default: 'iconfont'
    },
    badge: [Number, String],
    badgeColor: String,
    badgeBackgroundColor: String,
    badgeBorderColor: String
  },

  computed: {
    cmpt_isSvg () {
      return this.type === 'svg';
    },
    cmpt_name () {
      if (this.cmpt_isSvg) {
        return `#icon-${this.name}`;
      }
      return this.classPrefix + ' ' + this.name;
    },
    cmpt_style () {
      return {
        fontSize: isDef(this.size) ? addUnit(this.size) : '',
        color: this.color
      };
    },
    cmpt_badgeStyle () {
      return {
        color: this.badgeColor,
        backgroundColor: this.badgeBackgroundColor,
        borderColor: this.badgeBorderColor
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

  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
