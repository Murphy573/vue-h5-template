<template>
  <div ref="scrollWrapper"
    class="app-scroll"
    :class="{'hide-scrollbar': hideScrollbar}"
    :style="style">
    <slot></slot>
    <AppBacktop v-if="showBacktop"
      :visibilityHeight="backtopVisibilityHeight"
      :bottom="backtopBottom"
      :right="backtopRight" />
  </div>
</template>

<script>
import { getElement, getOffset } from '@/utils/dom';
import { scrollToByAnimate, getScroller, getScrollLeft, getScrollTop } from '@/utils/scroll';
import { BindEventMixin } from '@/mixins/bind-event.mixin.js';
import { BindCacheScrollMixin } from '@/mixins/cached-view.mixin';
import AppBacktop from '../app-backtop/backtop';

/**
 * 获取滚动后偏移量
 * @param {Number|Boolean} offset 偏移量：数字或布尔
 * @param {Number} size 元素大小（宽度或高度）
 * @param {Number} wrapperSize 滚动容器大小（宽度或高度）
 */
const getScrollOffset = (offset, size, wrapperSize) => {
  if (typeof offset === 'number') {
    return offset;
  }
  // 如果offsetX/Y值为true,那么将元素置于屏幕中间
  return offset ? Math.round(size / 2 - wrapperSize / 2) : 0;
};

export default {
  name: 'AppScroll',

  mixins: [
    BindEventMixin(function (bind) {
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }
      // 开启监听
      if (this.listenScrollEvent) {
        bind(this.scroller, 'scroll', this.scrolling);
      }
    }),
    BindCacheScrollMixin(function () {
      if (!this.cachePosition) return null;

      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }
      return this.scroller;
    })
  ],

  components: { AppBacktop },

  props: {
    /**
     * 是否开启竖向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: Boolean,
    /**
     * 是否监听滚动事件
     */
    listenScrollEvent: Boolean,
    /**
     * 是否隐藏滚动条
     */
    hideScrollbar: {
      type: Boolean,
      default: true
    },
    /**
     * 是否缓存位置
     */
    cachePosition: Boolean,
    /**
     * 是否展示滚动到顶按钮
     */
    showBacktop: {
      type: Boolean,
      default: false
    },
    backtopVisibilityHeight: {
      type: Number,
      default: 1200
    },
    backtopRight: {
      type: Number,
      default: 10
    },
    backtopBottom: {
      type: Number,
      default: 40
    }
  },

  data () {
    return {
      x: 0,
      y: 0,
      maxX: 0,
      maxY: 0,
      scrollerOffset: {
        offsetX: 0,
        offsetY: 0
      },
      scroller: null,
      refreshCount: 0
    };
  },

  computed: {
    style () {
      return {
        overflowY: this.scrollY ? 'auto' : 'hidden',
        overflowX: this.scrollX ? 'auto' : 'hidden'
      };
    }
  },

  deactivated () {
    this.x = getScrollLeft(this.scroller);
    this.y = getScrollTop(this.scroller);
  },

  methods: {
    _refresh () {
      if (this.refreshCount > 5) return;

      const wrapperOffset = getOffset(this.scroller);
      this.scrollerOffset.offsetX = wrapperOffset.left;
      this.scrollerOffset.offsetY = wrapperOffset.top;

      this.maxX = this.scroller.scrollWidth - this.scroller.clientWidth;
      this.maxY = this.scroller.scrollHeight - this.scroller.clientHeight;
    },
    _translate (x, y, duration) {
      x = Math.round(x);
      y = Math.round(y);
      // 不超过边界
      x = x < 0 ? 0 : x > this.maxX ? this.maxX : x;
      y = y < 0 ? 0 : y > this.maxY ? this.maxY : y;
      // 保存结束后的位置
      this.x = x;
      this.y = y;
      scrollToByAnimate(this.scroller, x, y, duration);
    },
    // 获取当前滚动的距离:x,y
    getPostion () {
      this._refresh();
      if (!this.scroller) {
        return {};
      }
      return {
        x: this.x,
        y: this.y,
        maxX: this.maxX,
        maxY: this.maxY
      };
    },
    scrollTo (x, y, duration = 0) {
      this._translate(x, y, duration);
    },
    scrollToTop (duration = 0) {
      this.scrollTo(this.x, 0, duration);
    },
    scrollToBottom (duration = 0) {
      this._refresh();
      this.scrollTo(this.x, this.maxY, duration);
    },
    scrollToLeft (duration = 0) {
      this.scrollTo(0, this.y, duration);
    },
    scrollToRight (duration = 0) {
      this._refresh();
      this.scrollTo(this.maxX, this.y, duration);
    },
    /**
     * 在当前滚动位置基础上，再滚动的距离
     */
    scrollBy (deltaX, deltaY, duration = 0) {
      const x = this.x + deltaX;
      const y = this.y + deltaY;
      this.scrollTo(x, y, duration);
    },
    /**
     * 滚动到指定元素
     * @param {Number|Boolean} offsetX 当为数值时，x轴滚动到指定元素后，再偏移指定数值，为true将元素滚动到容器中间
     * @param {Number|Boolean} offsetY 当为数值时，y轴滚动到指定元素后，再偏移指定数值，为true将元素滚动到容器中间
     */
    scrollToElement (el, offsetX = 0, offsetY = 0, duration = 0) {
      const _el = getElement(el);
      if (!_el) {
        throw new Error('Cannot find elment!');
      }
      this._refresh();
      const pos = getOffset(_el);
      /* 确定滚动后偏移量 */
      offsetX = getScrollOffset(
        offsetX,
        _el.offsetWidth,
        this.scroller.offsetWidth
      );
      offsetY = getScrollOffset(
        offsetY,
        _el.offsetHeight,
        this.scroller.offsetHeight
      );
      pos.left -= this.scrollerOffset.offsetX;
      pos.top -= this.scrollerOffset.offsetY;
      pos.left += offsetX || 0;
      pos.top += offsetY || 0;
      this.scrollTo(pos.left, pos.top, duration);
    },
    /**
     * 正在滚动
     */
    scrolling () {
      this.x = getScrollLeft(this.scroller);
      this.y = getScrollTop(this.scroller);
      // 派发滚动事件，外部可以监听
      this.$emit('on-scrolling', this.getPostion());
    }
  }
};
</script>

<style lang="scss" scoped>
.app-scroll {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;

  &.hide-scrollbar::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
