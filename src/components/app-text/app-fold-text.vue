<template>
  <div ref="foldText" :class="[textClass]" class="fold-text">
    <span
      ref="realText"
      class="real-text"
      :class="{ folded: isFold }"
      :style="cmpt_style">
      <slot></slot>
    </span>
    <div v-if="cmpt_canFold" class="expand-text" @click="isFold = !isFold">
      {{ isFold ? '展开' : '收起' }}
    </div>
  </div>
</template>

<script>
/**
 * 可展开收起的文本显示（根据行数）
 * warning：
 *  padding属性不要写在fold-text组件的textClass类名上，因为padding会影响多行文本显示（自己可以在本地尝试：加了overflow依然设置padding会影响文本显示）
 *  textClass原则上只接受一下css属性：fontsize、color、line-height等等跟文本显示有关的
 */

export default {
  name: 'AppFoldText',

  props: {
    textClass: String,
    // 最大显示行数
    limitLine: {
      type: Number,
      default: 3,
    },
  },

  data() {
    return {
      // 收起状态下的最大高度
      foldMaxHeight: 0,
      // 文本实际高度
      realHeight: 0,
      // 是否收缩
      isFold: true,
    };
  },

  computed: {
    cmpt_style() {
      if (this.isFold) {
        return {
          maxHeight: this.foldMaxHeight + 'px',
          '-webkit-line-clamp': this.limitLine,
        };
      }
      return {
        maxHeight: this.realHeight + 20 + 'px',
      };
    },
    cmpt_canFold() {
      return this.realHeight > this.foldMaxHeight;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.calcFoldHeight();
    });
  },

  methods: {
    calcFoldHeight() {
      const _style = window.getComputedStyle(this.$refs.foldText);
      let { lineHeight, fontSize } = _style;
      fontSize = fontSize || '12px';
      const _fontSize = Number((fontSize || '12px').match(/\d+/g)[0]);
      // 如果是normal，默认为字体大小的1.2倍
      lineHeight =
        lineHeight === 'normal' ? _fontSize * 1.2 + 'px' : lineHeight;
      const _lineHeight = Number(lineHeight.match(/\d+/g)[0]);
      // 文本收起状态下最大高度=行高*行数
      this.foldMaxHeight = _lineHeight * this.limitLine;

      setTimeout(() => {
        this.calcRealHeight();
      }, 0);
    },
    calcRealHeight() {
      this.realHeight = this.$refs.realText.scrollHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.fold-text {
  position: relative;
  display: inline-block;

  > .real-text {
    font-size: inherit;
    line-height: inherit;
    color: inherit;

    &.folded {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  .expand-text {
    text-align: right;
    font-size: 12px;
    color: $--color-primary-blue;
  }
}
</style>
