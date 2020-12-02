<template>
  <div class="x-scroller-wrapper--ignore">
    <div ref="contentRef"
      class="content hide-native-scrollbar">
      <slot></slot>
    </div>
    <div class="scroller-container"
      :style="scrollerContainerStyle">
      <div ref="scrollerRef"
        class="scroller"
        :style="scrollerStyle">
        <div ref="indicatorRef"
          class="indicator"
          :style="[indicatorStyle,indicatorTransformStyle]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { addUnit } from '@/utils/dom';
import { BindEventMixin } from '@/mixins/bind-event.mixin.js';
import { getScrollLeft } from '@/utils/scroll';

export default {
  name: 'AppXScroller',

  mixins: [
    BindEventMixin(function (bind) {
      if (!this.scroller) {
        this.scroller = this.$refs.contentRef;
      }
      bind(this.scroller, 'scroll', this.scrolling);
      // bind(window, 'resize', this.resize, true);
    })
  ],

  props: {
    // 滚动条容器高度
    scrollerContainerHeight: [Number, String],
    // 滚动条总宽度
    scrollerWidth: [Number, String],
    // 滚动条总宽度
    scrollerHeight: [Number, String],
    // 滚动条颜色
    scrollerColor: String,
    // 滚动指示器宽度
    indicatorWidth: [Number, String],
    // 滚动条颜色
    indicatorColor: String
  },

  data () {
    return {
      x: 0,
      ratio: 0
    };
  },

  computed: {
    scrollerContainerStyle () {
      return {
        height: addUnit(this.scrollerContainerHeight)
      };
    },
    scrollerStyle () {
      return {
        width: addUnit(this.scrollerWidth),
        height: addUnit(this.scrollerHeight),
        backgroundColor: this.scrollerColor
      };
    },
    indicatorStyle () {
      return {
        width: addUnit(this.indicatorWidth)
      };
    },
    indicatorTransformStyle () {
      return {
        transform: `translate3d(${addUnit(this.x)}, 0, 0)`
      };
    }
  },

  mounted () {
    this.initialize();
  },

  methods: {
    initialize () {
      this.$nextTick(() => {
        const { scrollerRef, indicatorRef, contentRef } = this.$refs;

        const contentLeftWidth = contentRef.scrollWidth - contentRef.offsetWidth;
        const scrollerLeftWidth = scrollerRef.offsetWidth - indicatorRef.offsetWidth;

        this.ratio = scrollerLeftWidth / contentLeftWidth;
      });
    },
    resize () {
      this.initialize();
    },
    scrolling () {
      this.x = getScrollLeft(this.scroller) * this.ratio;
    }
  }
};
</script>

<style lang="scss" scoped>
.x-scroller-wrapper--ignore {
  width: 100%;

  .content {
    width: 100%;
    overflow-x: auto;
  }

  .scroller-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;

    .scroller {
      width: 50px;
      height: 3px;
      border-radius: 4px;
      background-color: #d5d5d5;
      overflow: hidden;

      .indicator {
        width: 20px;
        height: 100%;
        background-color: #dd1a21;
        will-change: transform;
      }
    }
  }
}
</style>
