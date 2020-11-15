<template>
  <div class="app-empty full-container"
    :style="{'padding-top': paddingtop}">
    <slot name="image">
      <img class="image"
        :src="image" />
    </slot>

    <p class="text"
      :style="textStyle">
      <slot>
        数据为空
      </slot>
    </p>
    <slot name="extra">
    </slot>
  </div>
</template>

<script>

export default {
  name: 'AppEmpty',

  props: {
    image: String,
    color: {
      type: String,
      default () {
        return this.$_sassVars.colorPrimary;
      }
    },
    fontsize: {
      type: String,
      default: '14px'
    },
    paddingtop: String
  },

  computed: {
    textStyle () {
      return {
        color: this.color,
        'font-size': this.fontsize
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.app-empty {
  overflow: hidden;
  background-color: #ffffff;

  .image {
    display: block;
    width: 160px;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .text {
    text-align: center;
    margin: 12px 0 18px;
  }
}
</style>
