<template>
  <div ref="scrollWrapper"
    class="scroll-wrapper"
    :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { getElement, getOffset } from '@/utils/dom';
import { scrollToByAnimate } from '@/utils/scroll';

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
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     */
    probeType: {
      type: Number,
      default: 1
    },
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
     * 是否派发滚动事件
     */
    listenScroll: Boolean,
    /**
     * 是否派发列表滚动开始的事件
     */
    scrollStart: Boolean,
    /**
     * 是否派发列表滚动结束的事件
     */
    scrollEnd: Boolean
  },

  data () {
    return {
      x: 0,
      y: 0,
      max: 0,
      maxY: 0,
      scrollerOffset: {
        offsetX: 0,
        offsetY: 0
      },
      scroller: null
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

  methods: {
    _initScroll () {
      if (!this.$refs.scrollWrapper) {
        return;
      }
      this.scroller = this.$refs.scrollWrapper;
      // 获取滚动元素的offset
      let wrapperOffset = getOffset(this.scroller);
      this.scrollerOffset.offsetX = wrapperOffset.left;
      this.scrollerOffset.offsetY = wrapperOffset.top;
      this._refresh();
    },
    // 获取当前滚动的距离:x,y
    getPostion () {
      if (!this.scroller) {
        return {
          x: 0,
          y: 0,
          maxX: 0,
          maxY: 0
        };
      }
      return {
        x: this.x,
        y: this.y,
        maxX: 0,
        maxY: 0
      };
    },
    _refresh () {
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
    scrollTo (x, y, duration = 500) {
      this._translate(x, y, duration);
    },
    scrollToTop () {
      this.scrollTo(this.x, 0);
    },
    scrollToBottom () {
      this._refresh();
      this.scrollTo(this.x, this.maxY);
    },
    scrollToLeft () {
      this.scrollTo(0, this.y);
    },
    scrollToRight () {
      this._refresh();
      this.scrollTo(this.maxX, this.y);
    },
    /**
     * 在当前滚动位置基础上，再滚动的距离
     */
    scrollBy (deltaX, deltaY) {
      let x = this.x + deltaX;
      let y = this.y + deltaY;
      this.scrollTo(x, y);
    },
    scrollToElement (el, offsetX = 0, offsetY = 0) {
      let _el = getElement(el);
      if (!_el) {
        throw new Error('Cannot find elment!');
      }
      this._refresh();
      let pos = getOffset(_el);
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
      this.scrollTo(pos.left, pos.top);
    }
  },

  mounted () {
    // 保证在DOM渲染完毕后初始化
    setTimeout(() => {
      this._initScroll();
    }, 20);
  }
};
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
