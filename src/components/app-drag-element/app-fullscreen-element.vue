<template>
  <div ref="dragElement"
    :style="cmpt_getStyle"
    class="drag-elm"
    @touchstart="startDrag"
    @touchmove.stop.prevent="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag">
    <slot></slot>
  </div>
</template>

<script>
/* 传入的slot元素要指定宽高 */
import TouchMixin from '@/mixins/touch.mixin';

export default {
  name: 'AppFullscreenElement',

  mixins: [TouchMixin],

  props: {
    // 拖拽上下距离限制
    distance: {
      type: Object,
      default () {
        return {
          top: 44,
          bottom: 0
        };
      }
    },
    // 拖拽方向
    directionX: {
      type: Boolean,
      default: true
    },
    // 拖拽方向
    directionY: {
      type: Boolean,
      default: true
    },
    initPosition: {
      type: String,
      default: 'right',
      validator (v) {
        return ['left', 'right'].includes(v);
      }
    }
  },

  data () {
    return {
      elementPosition: {
        top: document.body.clientHeight / 2,
        left: 0,
        currentTop: document.body.clientHeight / 2,
        currentLeft: 0
      },
      draging: false,
      bodyReact: {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      },
      dragElementRect: {
        width: 0,
        height: 0
      },
      isInit: true
    };
  },

  computed: {
    cmpt_getStyle () {
      const { currentLeft, currentTop } = this.elementPosition;
      return {
        top: currentTop + 'px',
        left: currentLeft + 'px',
        transition: (this.isInit || this.draging) ? 'none' : '.5s cubic-bezier(0.18, 0.89, 0.32, 1)'
      };
    }
  },

  mounted () {
    this.$nextTick(() => {
      const { clientWidth, clientHeight } = this.$refs.dragElement;
      this.dragElementRect = {
        width: clientWidth,
        height: clientHeight
      };
      // 初始化垂直位置：居中
      this.elementPosition.top = this.elementPosition.currentTop =
        document.body.clientHeight / 2 - clientHeight / 2;
      // 初始化横向位置
      if (this.initPosition === 'right') {
        this.elementPosition.left = this.elementPosition.currentLeft =
          this.bodyReact.width - this.dragElementRect.width;
      }
      setTimeout(() => {
        this.isInit = false;
      }, 1000);
    });
  },

  methods: {
    resetDragElement () {
      const { clientWidth, clientHeight } = this.$refs.dragElement;
      this.dragElementRect = {
        width: clientWidth,
        height: clientHeight
      };
      if (this.elementPosition.currentLeft) {
        this.elementPosition.currentLeft = this.bodyReact.width - this.dragElementRect.width;
      }
    },
    startDrag (event) {
      this.draging = true;
      this.touchStartMixin(event);
    },
    onDrag (event) {
      this.touchMoveMixin(event);
      if (this.directionX) {
        !this.judgeOverScreen('horizontal') &&
          (this.elementPosition.currentLeft = this.elementPosition.left + this.deltaXMixin);
      }
      if (this.directionY) {
        !this.judgeOverScreen('vertical') &&
          (this.elementPosition.currentTop = this.elementPosition.top + this.deltaYMixin);
      }
    },
    endDrag () {
      this.draging = false;
      this.elementPosition.left = this.elementPosition.currentLeft;
      this.elementPosition.top = this.elementPosition.currentTop;

      // 屏幕竖向中线
      const _bodyMiddle = this.bodyReact.width / 2,
        _dragElementMiddle = this.dragElementRect.width / 2;

      // 屏幕左侧
      if (this.elementPosition.left + _dragElementMiddle < _bodyMiddle) {
        this.elementPosition.left = this.elementPosition.currentLeft = 0;
      }
      // 屏幕右侧
      else {
        this.elementPosition.left = this.elementPosition.currentLeft =
          this.bodyReact.width - this.dragElementRect.width;
      }
    },
    // 判断是否超出屏幕
    /**
     * @param {String} flag horizontal：横向  vertical：纵向
     */
    judgeOverScreen (flag = 'vertical') {
      if (flag === 'horizontal') {
        // 是否超出左边
        if (this.elementPosition.left + this.deltaXMixin < 0) {
          return true;
        }
        // 是否超出右边
        else if (this.elementPosition.left + this.deltaXMixin + this.dragElementRect.width > this.bodyReact.width) {
          return true;
        }
      }
      else if (flag === 'vertical') {
        // 是否超出上边
        if (this.elementPosition.top + this.deltaYMixin < this.distance.top) {
          return true;
        }
        // 是否超出下边
        else if (
          this.elementPosition.top + this.deltaYMixin + this.dragElementRect.height > this.bodyReact.height - this.distance.bottom
        ) {
          return true;
        }
      }

      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-elm {
  position: fixed;
}
</style>
