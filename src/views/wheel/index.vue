<template>
  <div>
    <h2>转盘抽奖</h2>
    <div class="section--ignore">
      <AppLotteryWheel ref="wheel"
        :prizeIndex="2" />
    </div>
    <div>
      <van-button @click="start">
        开始抽奖
      </van-button>
    </div>
  </div>
</template>

<script>
import AppLotteryWheel from '@/components/app-lottery/wheel';

export default {
  name: 'Wheel',

  mixins: [],

  components: { AppLotteryWheel },

  props: {},

  data () {
    return {

    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {
    start () {
      this.$refs.wheel.startLottery();
    }
  }
};
</script>

<style lang="scss" scoped>
.section--ignore {
  width: 300px;
  height: 300px;
  // background:  $--color-secondary
  margin: 0 auto;
}
</style>
