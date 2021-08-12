<template>
  <div class="app-progress-bar">
    <div v-if="!textInside &&showText"
      class="outer-text font-weight--medium"
      :style="cmpt_textStyle">
      {{cmpt_text}}
    </div>
    <div class="bar"
      :class="{'is-outer-text': !textInside&&showText}">
      <div class="outer"
        :style="cmpt_outerStyle">
        <div class="inner"
          :style="cmpt_innerStyle">
          <div class="inner-text font-weight--medium"
            v-if="textInside &&showText"
            :style="cmpt_textStyle">
            {{cmpt_text}}
          </div>
        </div>
        <div v-if="showBorder"
          class="outer-border"
          :style="cmpt_borderStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { addUnit } from '@/utils/dom';
import { colorTextSecondary } from '@/styles/index.scss';

export default {
  name: 'AppProgressBar',

  props: {
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 4
    },
    textInside: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: true
    },
    color: {
      type: [String, Function],
      default: ''
    },
    showBorder: Boolean,
    borderColor: String,
    textColor: {
      type: String,
      default: colorTextSecondary
    },
    formatText: Function,
    background: String
  },

  computed: {
    cmpt_textStyle () {
      return {
        color: this.textColor
      };
    },
    cmpt_borderStyle () {
      return {
        borderColor: this.borderColor
      };
    },
    cmpt_outerStyle () {
      return {
        height: addUnit(this.strokeWidth),
        backgroundColor: this.background
      };
    },
    cmpt_innerStyle () {
      const style = {};
      style.width = this.percentage + '%';
      style.background = this.getCurrentColor(this.percentage);
      return style;
    },
    cmpt_text () {
      if (typeof this.formatText === 'function') {
        return this.formatText(this.percentage) || '';
      }
      else {
        return `${this.percentage}%`;
      }
    }
  },

  methods: {
    getCurrentColor (percentage) {
      if (typeof this.color === 'function') {
        return this.color(percentage);
      }
      else {
        return this.color;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-progress-bar {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  line-height: 1;
  overflow: hidden;

  .bar {
    flex: 1;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
    padding-right: 0;
    margin-right: 0;

    .outer {
      position: relative;
      vertical-align: middle;
      height: 4px;
      border-radius: 100px;
      background-color: #ffffff;
      // border: 1px solid rgba($color: $--color-primary, $alpha: 0.2);
      overflow: hidden;

      .inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(90deg, $--color-primary, #f14322);
        text-align: right;
        border-radius: 100px;
        white-space: nowrap;
        transition: width 0.6s ease;
        line-height: 1;
        z-index: 10;

        &::after {
          display: inline-block;
          content: '';
          height: 100%;
          vertical-align: middle;
        }

        .inner-text {
          display: inline-block;
          vertical-align: middle;
          color: #ffffff;
          font-size: 10px;
          margin: 0 5px;
        }
      }

      .outer-border {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 1px solid rgba($color: $--color-primary, $alpha: 0.2);
        z-index: 1;
        border-radius: 100px;
      }
    }

    // &.is-outer-text {
    //   padding-right: 50px;
    //   margin-right: -50px;
    // }
  }

  .outer-text {
    margin-bottom: 2px;
    text-align: center;
    width: 78px;
    color: $--color-text-secondary;
    font-size: 8px;
    line-height: 12px;
  }
}
</style>
