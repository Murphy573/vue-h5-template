<template>
  <van-tabbar v-model="active"
    inactive-color="#666"
    :fixed="false"
    style="z-index: 99;"
    @change="handleChange">
    <van-tabbar-item v-for="(tab, index) in tabbar"
      :icon="tab.icon"
      :dot="tab.dot"
      :info="tab.info"
      :key="index">
      {{tab.name}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'MainTabbar',

  data () {
    return {
      active: 0
    };
  },

  computed: {
    tabbar () {
      const _tabbar = [
        {
          name: '主页',
          routerName: 'home',
          icon: 'wap-home-o',
          dot: false,
          info: '',
          show: true
        },
        {
          name: '我的',
          routerName: 'my',
          icon: 'user-circle-o',
          dot: false,
          info: '',
          show: true
        }
      ];

      return _tabbar.filter(bar => bar.show);
    }
  },

  watch: {
    $route: {
      handler ({ name }) {
        this.setActive(name);
      },
      immediate: true
    }
  },

  mounted () {
    const toName = this.$route.name;
    this.setActive(toName);
  },

  activated () {
    const toName = this.$route.name;
    this.setActive(toName);
  },

  methods: {
    handleChange (active) {
      this.$router.push({ name: this.tabbar[active].routerName });
    },
    changeActive ({ name }) {
      this.setActive(name);
    },
    setActive (name) {
      this.tabbar.forEach((tab, i) => {
        if (tab.routerName === name) {
          this.active = i;
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.color {
  color: #ab956d;
}
</style>
