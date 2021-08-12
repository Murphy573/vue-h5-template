<template>
  <div class="app-header"
    :style="cmpt_getStyle">
    <div class="left text-ellipsis">
      <slot name="left">
        <van-icon v-if="showLeft"
          name="arrow-left"
          size="20"
          @click="$router.back()" />
      </slot>
    </div>
    <div class="title text-ellipsis">
      <slot>
        {{title}}
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <van-icon v-if="showRight"
          name="wap-home-o"
          @click="jumpHomeForRightIcon" />
      </slot>
    </div>
  </div>
</template>

<script>
// type对应的样式
const TYPE_STYLE_MAPPER = {
  transparent: {
    color: '#ffffff',
    background: 'rgba(255,255,255,0)'
  },
  primary: {
    color: '#333333',
    background: 'rgb(247, 247, 247)'
  },
  minor: {
    color: '#333333',
    background: 'transparent'
  },
  normal: {
    color: '#333333',
    background: '#ffffff'
  }
};

export default {
  name: 'AppHeader',

  props: {
    leftIconClass: {
      type: String,
      default: 'iconfanhui'
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    },
    // 是否使用replace跳转
    replace: Boolean,
    type: {
      type: String,
      default: 'normal',
      validator (v) {
        return ['transparent', 'primary', 'minor', 'normal'].indexOf(v) > -1;
      }
    },
    changeTitle: {
      type: Boolean,
      default: true
    },
    title: String,
    setStyle: {
      type: Object,
      default () {
        return null;
      }
    }
  },

  computed: {
    cmpt_getStyle () {
      return Object.assign({}, TYPE_STYLE_MAPPER[this.type], this.setStyle);
    }
  },

  activated () {
    if (!this.changeTitle) return;
    document.title = this.title;
  },

  created () {
    if (!this.changeTitle) return;
    document.title = this.title;
  },

  methods: {
    jumpHome () {
      this.$router[this.replace ? 'replace' : 'push']({ name: 'home', query: { tab: 'home' } });
    },
    jumpHomeForRightIcon () {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  display: flex;
  font-size: 14px;
  height: 44px;
  align-items: center;
  padding: 0 10px;
  text-align: center;
  white-space: nowrap;
  background: rgba($color: #ffffff, $alpha: 0);

  > .left {
    text-align: left;
    flex: 0 0 18%;
    min-height: 20px;
  }

  > .title {
    flex: 0 0 64%;
    font-size: 17px;
    font-weight: bold;
  }

  > .right {
    flex: 0 0 18%;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
