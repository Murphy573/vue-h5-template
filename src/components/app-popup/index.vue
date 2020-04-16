<template>
  <van-popup class="popup"
    :class="{card: position ==='bottom'}"
    v-model="myVisible"
    :position="position"
    :overlay="overlay"
    :lock-scroll="lockScroll"
    :lazy-render="lazyRender"
    :close-on-click-overlay="closeOnClickOverlay"
    :get-container="getContainer"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
    @click-overlay="onClickOverlay">
    <slot></slot>
  </van-popup>
</template>

<script>
/**
 * 使用注意事项：
 *  由于scroll组件使用会给元素添加transform: scale(1)，后代元素fixed定位失效，所以遇到这种情况有两种办法：
 *    1、如果scroll组件中有上拉加载、下拉刷新请将AppPopup置于scroll组件外
 *    2、如果不存在上拉加载、下拉刷新等,考虑使用原生滚动
 */
export default {
  name: 'AppPopup',
  model: {
    prop: 'visible',
    event: 'visibleChange'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom',
      validator (v) {
        return ['top', 'right', 'bottom', 'left', 'center'].indexOf(v) > -1;
      }
    },
    getContainer: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      myVisible: false
    };
  },
  watch: {
    visible: {
      handler () {
        this.myVisible = !!this.visible;
      },
      immediate: true
    },
    myVisible () {
      this.$emit('visibleChange', this.myVisible);
    }
  },
  methods: {
    // 打开弹出层时触发
    onOpen () {
      this.$emit('onOpen');
    },
    // 打开弹出层且动画结束后触发
    onOpened () {
      this.$emit('onOpened');
    },
    // 关闭弹出层时触发
    onClose () {
      this.$emit('onClose');
    },
    // 关闭弹出层且动画结束后触发
    onClosed () {
      this.$emit('onClosed');
    },
    // 点击蒙层时触发
    onClickOverlay () {
      this.$emit('onClickOverlay');
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  // height: 100%;
  overflow: hidden;
}
.van-popup--center {
  width: 9.2rem /* 690/75 */;
  border-radius: 0.213333rem /* 16/75 */;
  overflow: hidden;
}
.card {
  border-top-left-radius: 0.066667rem /* 5/75 */;
  border-top-right-radius: 0.066667rem /* 5/75 */;
  background-color: #ffffff;
}
</style>
