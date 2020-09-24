<template>
  <div>
    <transition name="van-fade">
      <div v-if="visible"
        class="app-backtop"
        :style="cmpt_style"
        @click.stop="handleClick">
        <van-icon name="back-top"
          size="16" />
      </div>
    </transition>
  </div>
</template>

<script>
import { BindEventMixin } from '@/mixins/bind-event.mixin.js';
import { scrollToByAnimate, getScroller, getScrollLeft, getScrollTop } from '@/utils/scroll';
import { throttle } from '@/utils/debounce-throttle.js';

export default {
  name: 'AppBacktop',

  mixins: [
    BindEventMixin(function (bind) {
      // 开启监听
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }
      bind(this.scroller, 'scroll', this.throttledScrollHandler);
    })
  ],

  props: {
    visibilityHeight: {
      type: Number,
      default: 1200
    },
    right: {
      type: Number,
      default: 8
    },
    bottom: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {
      visible: false
    };
  },

  computed: {
    cmpt_style () {
      return {
        right: `${this.right}px`,
        bottom: `${this.bottom}px`
      };
    }
  },

  created () {
    this.throttledScrollHandler = throttle(this.onScroll, 150);
  },

  methods: {
    onScroll () {
      const scrollTop = getScrollTop(this.scroller);
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick (e) {
      const x = getScrollLeft(this.scroller);
      scrollToByAnimate(this.scroller, x, 0, 150);
      this.$emit('click', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-backtop {
  position: fixed;
  bottom: 80px;
  right: 9px;
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: #ffffff;
  border-radius: 50%;

  cursor: pointer;
  z-index: 99;
}
</style>
