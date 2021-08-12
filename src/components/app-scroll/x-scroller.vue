<template>
  <div class="x-scroller-wrapper--ignore">
    <div ref="contentRef"
      class="content hide-native-scrollbar">
      <slot></slot>
    </div>
    <div v-if="showScroller"
      class="scroller-container"
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
import { setScrollLeft, getScrollLeft } from '@/utils/scroll';

export default {
  name: 'AppXScroller',

  mixins: [
    BindEventMixin(function (bind) {
      if (!this.scroller) {
        this.scroller = this.$refs.contentRef;
      }
      if (this.showScroller) {
        bind(this.scroller, 'scroll', this.scrolling);
        bind(window, 'resize', this.resize, true);
      }
    })
  ],

  props: {
    // 是否展示滚动条
    showScroller: {
      type: Boolean,
      default: true
    },
    // 滚动条容器高度
    scrollerContainerHeight: [Number, String],
    // 滚动条总宽度
    scrollerWidth: [Number, String],
    // 滚动条总高度
    scrollerHeight: [Number, String],
    // 滚动条颜色
    scrollerColor: String,
    // 滚动指示器宽度
    indicatorWidth: [Number, String],
    // 滚动条指示器颜色
    indicatorColor: String
  },

  data () {
    return {
      x: 0,
      ratio: 0,
      observer: {}
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
        width: addUnit(this.indicatorWidth),
        backgroundColor: this.indicatorColor
      };
    },
    indicatorTransformStyle () {
      return {
        transform: `translate3d(${addUnit(this.x)}, 0, 0)`
      };
    }
  },

  mounted () {
    if (!this.showScroller) return;

    this.createObserver();
    this.observe();
    this.initialize();
  },

  activated () {
    this.observe();
  },

  deactivated () {
    this.observer.disconnect && this.observer.disconnect();
  },

  methods: {
    createObserver () {
      if (window.MutationObserver) {
        this.observer = new MutationObserver((mutation) => {
          this.initialize();
        });
      }
    },
    observe () {
      const { contentRef } = this.$refs;
      if (!contentRef) return;

      this.observer.observe && this.observer.observe(contentRef, { childList: true, subtree: true });
    },
    initialize () {
      if (!this.showScroller) return;

      this.$nextTick(() => {
        const { scrollerRef, indicatorRef, contentRef } = this.$refs;

        if (!scrollerRef || !indicatorRef) return;

        const contentLeftWidth = contentRef.scrollWidth - contentRef.offsetWidth;
        const scrollerLeftWidth = scrollerRef.offsetWidth - indicatorRef.offsetWidth;

        this.ratio = scrollerLeftWidth / contentLeftWidth;
      });
    },
    resize () {
      this.$nextTick(() => {
        this.initialize();
        this.x = 0;
        setScrollLeft(this.scroller, 0);
      });
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
      height: 4px;
      border-radius: 4px;
      background-color: #d5d5d5;
      overflow: hidden;

      .indicator {
        width: 20px;
        height: 100%;
        border-radius: 4px;
        background-color: $--color-primary;
        will-change: transform;
      }
    }
  }
}
</style>
