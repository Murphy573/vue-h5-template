<template>
  <div ref="richtextRef"
    class="rich-text">
    <!-- 京东富文本 -->
    <div v-if="isJd"
      v-html="richtext"
      ref="jdContent"
      class="jd-content"
      :style="{
        transform: `scale(${cmpt_jdScaleFactor})`,
            transformOrigin:' 0 0',
            width: '750px'
            }"></div>
    <!-- 默认我们的富文本 -->
    <div v-else
      v-html="richtext"
      class="default-content"></div>
  </div>
</template>

<script>

export default {
  name: 'AppRichTextDisplay',

  props: {
    richtext: String,
    // 是否是京东富文本
    isJd: Boolean
  },
  data () {
    return {
      jdOffsetHeight: 0
    };
  },
  computed: {
    cmpt_jdScaleFactor () {
      return document.body.clientWidth / 750;
    }
  },
  mounted () {
    if (!this.isJd) return;
    this.startRender();
  },
  methods: {
    startRender () {
      setTimeout(() => {
        let _rich = this.$refs.richtextRef;
        if (!_rich) return;
        let _jdWapper = _rich.querySelector('.jd-content');
        if (_jdWapper && _jdWapper.offsetHeight && this.jdOffsetHeight >= _jdWapper.offsetHeight) {
          _rich.style.height = _jdWapper.offsetHeight * this.cmpt_jdScaleFactor + 'px';
        }
        else {
          this.jdOffsetHeight = _jdWapper.offsetHeight;
          this.startRender();
        }
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.rich-text {
  width: 100%;
  overflow: hidden;
  height: max-content;

  .default-content {
    width: 100%;
    overflow: hidden;
    height: max-content;

    /deep/ {
      p {
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
        word-break: break-all;
      }

      img {
        max-width: 100%;
        display: block;
        width: auto;
        height: auto;
      }
    }
  }

  .jd-content {
    overflow: hidden;
  }
}
</style>
