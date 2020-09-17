<template>
  <div class="waterfall full-container hide-native-scrollbar">
    <AppWaterfall ref="aw"
      v-model="loading"
      :finished="finished"
      :cols="2"
      :gutter="20"
      justify
      item-margin-bottom="10"
      @load="load">
      <template #default="{data}">
        <div :style="data">
          <span style="background:red;color:white">{{data.text}}</span>
        </div>
      </template>
    </AppWaterfall>
  </div>
</template>

<script>

export default {
  name: 'Waterfall',

  data () {
    return {
      loading: false,
      finished: false,
      count: 0
    };
  },

  mounted () {
    this.load();
  },

  methods: {
    load () {
      this.count++;
      this.loading = true;

      let arr = [];
      for (let index = 0; index < 14; index++) {
        let hexColor = '#' + Math.floor(Math.random() * 16777216).toString(16);
        let height = Math.floor(Math.random() * (500 - 50 + 1)) + 50;

        arr.push({
          background: hexColor,
          height: height + 'px',
          text: (this.count - 1) * 14 + index
        });
      }
      this.$refs.aw.append(arr);
      this.finished = this.count >= 4;

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.waterfall {
  overflow-y: auto;

  .item {
    height: 200px;
    word-break: break-all;
    background: lavenderblush;
  }
}
</style>
