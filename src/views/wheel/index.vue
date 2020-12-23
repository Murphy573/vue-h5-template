<template>
  <div>
    <h2>转盘抽奖</h2>
    <div class="section--ignore">
      <AppLotteryWheel />
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

  methods: {}
};
</script>

<style lang="scss" scoped>
.section--ignore {
  width: 300px;
  height: 300px;
  // background: $--color-golden;
  margin: 0 auto;
}
</style>
