<template>
  <AppPageContainer v-title="title">
    <template #header>
      <app-header :title="title"
        :show-right="false"
        :show-left="false">
      </app-header>
    </template>
    <template #content>
      <div class="home-wrapper full-container">
        <span>主页</span>
        <van-button :color="$_sassVars.colorPrimary"
          @click="validate">数据校验</van-button>
        <van-button :color="$_sassVars.colorPrimary"
          @click="$router.push({name:'scroll'})">跳转到scroll</van-button>
        <van-button @click="$router.push({name:'fall'})">跳转到waterfall</van-button>
        <van-button @click="$router.push({name:'wheel'})">跳转到wheel</van-button>
        <ul class="app-grid">
          <li v-for="i of 3"
            :key="i"
            class="app-grid-item">
          </li>
        </ul>
        <AppIcon type="svg"
          name="realname"
          size="50"
          badge="20" />
        <AppSwitch />
        <AppXScroller :showScroller="true"
          scrollerContainerHeight="20"
          scrollerWidth="100"
          scrollerHeight="8"
          indicatorWidth="20">
          <ul class="list">
            <li v-for="i of 10"
              :key="i"
              class="item">
              item{{i}}
            </li>
          </ul>
        </AppXScroller>
      </div>
    </template>
  </AppPageContainer>
</template>

<script>
import AppXScroller from '@/components/app-scroll/x-scroller';
import AppSwitch from '@/components/app-switch/index';
import { PHONE_PATTERN, TRADE_PASSWORD_PATTERN } from '../../../configs/pattern';
import Validator from '@/utils/validator.js';

export default {
  name: 'MainHome',

  components: { AppXScroller, AppSwitch },

  data () {
    return {
      title: '主页',
      loginInfo: {
        phone: '1357217101',
        smsCode: '1',
        readme: false
      },
      rules: {
        phone: [
          { required: true, message: '请输入您的手机号码' },
          { pattern: PHONE_PATTERN, message: '您输入的手机号码格式有误' }
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码' },
          { pattern: TRADE_PASSWORD_PATTERN, message: '验证码只能为6位数字' }
        ]
        // readme: [
        //   {
        //     required: true,
        //     message: '请阅读并同意《用户协议》!',
        //     transform(value) {
        //       return value ? '1' : '';
        //     },
        //   },
        // ],
      }
    };
  },

  methods: {
    async validate () {
      try {
        await Validator(this.rules, this.loginInfo);
        return true;
      }
      catch (errors) {
        // this.setData({ canSubmit: false });
        // return Promise.reject(errors);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.home-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 30px;

  > span {
    margin-left: 100px;
    background: $--color-secondary;
  }

  ::v-deep {
    .van-button {
      font-size: 20px !important;
    }
  }

  .app-grid {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    > .app-grid-item {
      width: 33.333333%;
      height: 100px;
      background: $--color-secondary;
      margin-bottom: 10px;

      &:nth-child(1) {
        flex-shrink: 1;
        flex-grow: 1;
        width: 50px;
      }
      &:nth-child(2) {
        flex-shrink: 2;
        flex-grow: 2;
        width: 100px;
        background: $--color-primary;
      }
      &:nth-child(3) {
        flex-grow: 3;
        flex-shrink: 3;
        width: 150px;
      }
    }
  }

  .list {
    display: flex;
    height: 200px;
    background: cornsilk;

    .item {
      flex: none;
      width: 200px;
      height: 100%;
    }
  }
}
</style>
