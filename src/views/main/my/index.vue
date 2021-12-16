<template>
  <AppPageContainer v-title="'我的'">
    <template #header>
      <app-header title="我的" :show-right="false" :show-left="false">
      </app-header>
    </template>
    <template #content>
      <div class="my-wrapper full-container">
        我的
        <van-button type="primary" @click="midwayLoginMixin"
          >点击登录</van-button
        >
        <van-button v-if="isLogin" type="danger" @click="logout"
          >点击登出</van-button
        >
      </div>
    </template>
  </AppPageContainer>
</template>

<script>
import { mapActions } from 'vuex';
import LoginMixin from '@/mixins/login.mixin';

export default {
  name: 'MainMy',

  mixins: [LoginMixin],

  data() {
    return {
      isLogin: false,
    };
  },

  activated() {
    this.pageInit();
  },

  methods: {
    ...mapActions(['vx_ac_Logout']),
    async pageInit() {
      try {
        const _res = await this.checkIsLogin();
        if (_res) {
          this.isLogin = true;
        }
      } catch (error) {}
    },
    onLoginedMixin() {
      this.isLogin = true;
    },
    async logout() {
      try {
        await this.$dialog.confirm({
          message: '确定要退出当前账号吗？',
        });
        await this.vx_ac_Logout();
        this.isLogin = false;
        window.location.reload();
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.my-wrapper {
  overflow-y: auto;
}
</style>
