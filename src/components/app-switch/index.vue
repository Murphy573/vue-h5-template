<template>
  <div class="">
    <button @click="show = !show">切换</button>
    <div class="app-switch">
      <SwipeScaleTransition>
        <img :key="list[currentIndex]"
          :src="list[currentIndex]" />
      </SwipeScaleTransition>
    </div>
    <div class="app-switch">
      <transition name="list"
        mode="out-in"
        appear>
        <img :key="list[currentIndex]"
          :src="list[currentIndex]" />
      </transition>
    </div>
  </div>

</template>

<script>
import SwipeScaleTransition from '../../transitions/swipe-scale';

export default {
  name: 'AppSwitch',

  components: { SwipeScaleTransition },

  data () {
    return {
      show: false,
      currentIndex: 0,
      list: [
        'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/139945/29/5587/122473/5f3a47ecE554747d1/1aa211995c7dbdfb.jpg!cr_1125x445_0_171!q70.jpg.dpg',
        'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/147581/8/5570/134502/5f39f7aaE24b6cbcb/261100245955f518.jpg!cr_1125x445_0_171!q70.jpg.dpg',
        'http://imgcps.jd.com/ling4/70779632270/5omL5py66YWN5Lu25pyJ5L-d6K-B/54iG5ZOB54m55oOg/p-5c136f5e82acdd181ddfed4e/4a434ce9/cr_1125x445_0_171/s1125x690/q70.jpg',
        'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/120749/3/4836/103938/5ee4a8b4E8d12e2d9/c2e4dea89158caa3.jpg!cr_1125x445_0_171!q70.jpg.dpg',
        'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/141798/16/5599/97585/5f39e2b1Efb7431bf/eedfc057523ca010.jpg!cr_1125x445_0_171!q70.jpg.dpg'
      ]
    };
  },

  created () {
    setInterval(() => {
      if (this.currentIndex < this.list.length - 1) {
        this.currentIndex++;
      }
      else {
        this.currentIndex = 0;
      }
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
.app-switch {
  width: 100px;
  height: 100px;
  background: $--color-secondary;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

  .list-enter-active,
  .list-leave-active {
    transform: scale(1);
    transition: all 0.5s ease-out;
  }
  .list-enter,
  .list-leave-to {
    transform: scale(0);
    transition: all 0.1s ease-in;
  }
}
</style>
