<template>
  <div ref="dragElement"
    :style="cmpt_getStyle"
    class="app-drag-elm"
    @touchstart="startDrag"
    @touchmove.stop.prevent="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag">
    <slot></slot>

    <div v-if="showClose"
      class="close"
      @click.stop="handleClose">
      <AppIcon name="iconguanbi1"
        size="8"
        color="#ffffff" />
    </div>
  </div>
</template>

<script>
/* 传入的slot元素要指定宽高 */
import TouchMixin from '@/mixins/touch.mixin';

export default {
  name: 'AppFullscreenElement',

  mixins: [TouchMixin],

  props: {
    /**
     * 拖拽上下左右距离限制: 传入以下格式
     * {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
     */
    distance: {
      type: Object,
      default () {
        return {};
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
    },
    // 是否展示关闭按钮
    showClose: Boolean
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
      let { currentLeft, currentTop } = this.elementPosition;
      return {
        top: currentTop + 'px',
        left: currentLeft + 'px',
        transition: (this.isInit || this.draging) ? 'none' : '.5s cubic-bezier(0.18, 0.89, 0.32, 1)'
      };
    },
    cmpt_disdance () {
      return Object.assign(
        {},
        {
          top: 44,
          bottom: 0,
          left: 0,
          right: 0
        },
        this.distance
      );
    }
  },

  mounted () {
    this.$nextTick(() => {
      let { clientWidth, clientHeight } = this.$refs.dragElement;
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
          this.bodyReact.width - this.dragElementRect.width - this.cmpt_disdance.right;
      }
      else {
        this.elementPosition.left = this.elementPosition.currentLeft = this.cmpt_disdance.left;
      }
      setTimeout(() => {
        this.isInit = false;
      }, 1000);
    });
  },

  methods: {
    resetDragElement () {
      let { clientWidth, clientHeight } = this.$refs.dragElement;
      this.dragElementRect = {
        width: clientWidth,
        height: clientHeight
      };
      if (this.elementPosition.currentLeft) {
        this.elementPosition.currentLeft = this.bodyReact.width - this.dragElementRect.width;
      }
    },
    startDrag (event) {
      // 兼容处理：如果没获取到宽或者高，那么再次获取一次
      if (!this.dragElementRect.width || !this.dragElementRect.height) {
        let { clientWidth, clientHeight } = this.$refs.dragElement;
        this.dragElementRect = {
          width: clientWidth,
          height: clientHeight
        };
      }

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
      let _bodyMiddle = this.bodyReact.width / 2,
        _dragElementMiddle = this.dragElementRect.width / 2;

      // 屏幕左侧
      if (this.elementPosition.left + _dragElementMiddle < _bodyMiddle) {
        this.elementPosition.left = this.elementPosition.currentLeft = this.cmpt_disdance.left;
      }
      // 屏幕右侧
      else {
        this.elementPosition.left = this.elementPosition.currentLeft =
          this.bodyReact.width - this.dragElementRect.width - this.cmpt_disdance.right;
      }
    },
    // 判断是否超出屏幕
    /**
     * @param {String} flag horizontal：横向  vertical：纵向
     */
    judgeOverScreen (flag = 'vertical') {
      const { left, top } = this.elementPosition;
      const { deltaXMixin, deltaYMixin } = this;
      const { width: dragElWidth, height: dragElHeight } = this.dragElementRect;
      const { width: bodyWidth, height: bodyHeight } = this.bodyReact;
      const { left: disLeft, right: disRight, top: disTop, bottom: disBottom } = this.cmpt_disdance;

      if (flag === 'horizontal') {
        // 是否超出左边
        if (left + deltaXMixin < disLeft) {
          return true;
        }
        // 是否超出右边
        else if (left + deltaXMixin + dragElWidth + disRight > bodyWidth) {
          return true;
        }
      }
      else if (flag === 'vertical') {
        // 是否超出上边
        if (top + deltaYMixin < disTop) {
          return true;
        }
        // 是否超出下边
        else if (
          top + deltaYMixin + dragElHeight > bodyHeight - disBottom
        ) {
          return true;
        }
      }

      return false;
    },
    handleClose () {
      this.$emit('close');
      this.$destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-drag-elm {
  position: fixed;

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -12px;
    right: -12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $--color-ddd;
  }
}
</style>
