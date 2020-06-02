<template>
  <app-popup v-model="myVisible"
    :close-on-click-overlay="false"
    position="right"
    class="login-panel full-container"
    @onOpen="onOpen"
    @onClosed="onClosed">
    <app-page-container v-if="showPage">
      <template #header>
        <app-header title="登录"
          :set-style="{color: '#333333'}"
          :changeTitle="false"
          :showRight="false"
          :msgShow="false">
          <template #left>
            <van-icon name="arrow-left"
              size="20"
              @click="vx_ac_SetShowLoginPanel(false)" />
          </template>
        </app-header>
      </template>
      <template #content>
        <div class="login-content full-container">
          <form class="form">
            <h3>欢迎登录</h3>
            <div class="form-item">
              <input v-model="loginInfo.phone"
                v-reset-body-position
                class="phone input"
                placeholder="请输入手机号"
                pattern="[0-9]*"
                maxlength="11">
              <i class="icon-phone iconfont iconshouji"></i>
            </div>
            <div class="form-item">
              <input v-model="loginInfo.smsCode"
                v-reset-body-position
                class="verfy input"
                placeholder="请输入短信验证码"
                maxlength="6"
                pattern="[0-9]*">
              <span class="verfy-btn"
                :class="{disabled: !canRestartIntervalMixin}"
                @click="sendVerfyCode">{{cmpt_resendDescMixin}}</span>
            </div>

            <app-button :width="630"
              :height="88"
              :font-size="36"
              class="submit"
              @click="login">登录</app-button>
          </form>
        </div>
      </template>
    </app-page-container>
  </app-popup>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { PHONE_PATTERN } from '@/configs/pattern';
import { api_send_smsCodeForLogin } from '@/apis/basic';
import CountdownMixin from '@/mixins/countdown.mixin';
import AppPopup from '@/components/app-popup';
import Validator from '@/utils/validator';

export default {
  name: 'AppLogin',

  mixins: [CountdownMixin],

  components: { AppPopup },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      myVisible: false,
      showPage: false,
      readme: true,
      loginInfo: {
        phone: '',
        smsCode: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入您的手机号码' },
          { pattern: PHONE_PATTERN, message: '输入的手机号码格式有误' }
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码' },
          { pattern: /^\d{6}$/, message: '验证码只能为6位数字' }
        ]
      }
    };
  },

  computed: {
    ...mapGetters(['vx_gt_showLoginPanel'])
  },

  watch: {
    visible: {
      handler (v) {
        this.myVisible = v;
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(['vx_ac_Login', 'vx_ac_SetShowLoginPanel']),
    // 发送验证码
    async sendVerfyCode () {
      if (!this.canRestartIntervalMixin) return;
      if (!PHONE_PATTERN.test(this.loginInfo.phone)) {
        this.$toast('手机号码输入有误，请检查后再获取验证码');
        return;
      }
      try {
        await api_send_smsCodeForLogin(this.loginInfo.phone);
        this.$toast('验证码已发送，请注意查收');
        this.startIntervalMixin();
      }
      catch (error) { }
    },
    // 校验表单
    async validateForm () {
      try {
        await Validator(this.rules, this.loginInfo);
        return true;
      }
      catch (errors) {
        this.$toast(errors[0].message);
        return Promise.reject(errors);
      }
    },
    async login () {
      try {
        await this.validateForm();
        // 执行验证码登录
        await this.vx_ac_Login({
          ...this.loginInfo,
          loginMethod: 2
        });
        this.vx_ac_SetShowLoginPanel(false);
      }
      catch (error) { }
    },
    onOpen () {
      this.showPage = true;
    },
    onClosed () {
      this.showPage = false;
      this.clearIntervalMixin();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-panel {
  overflow: hidden;
  background-color: #f2f4f5;

  .login-content {
    padding: $--size-30;

    .form {
      width: 100%;
      background-color: #ffffff;
      padding: 0.56rem /* 42/75 */ 0.4rem; /* 30/75 */
      border-radius: 8px;

      > h3 {
        font-size: $--size-36;
        font-family: $--family-bold;
        color: #333333;
        font-weight: bold;
        margin-bottom: 0.56rem /* 42/75 */;
      }

      .form-item {
        position: relative;
        width: 100%;
        height: 1.173333rem /* 88/75 */;
        margin-bottom: 0.266667rem /* 20/75 */;
        font-size: 0.373333rem /* 28/75 */;

        > .input {
          width: 100%;
          height: 100%;
          background-color: #ebeef1;
          border: none;
          padding: 0 0.586667rem /* 44/75 */;
          border-radius: 1.173333rem /* 88/75 */;

          &.phone {
            padding-left: 1.16rem /* 87/75 */;
          }

          &.verfy {
            padding-right: 2.933333rem /* 220/75 */;
          }
        }

        .icon-phone {
          position: absolute;
          top: 50%;
          left: 0.48rem /* 36/75 */;
          transform: translateY(-50%);
          color: #a5a9ae;
          font-size: 0.533333rem /* 40/75 */;
        }

        .verfy-btn {
          position: absolute;
          width: 3.8rem /* 210/75 */;
          top: 50%;
          right: -30px;
          transform: translateY(-50%);
          padding-left: 0.266667rem /* 20/75 */;
          padding-right: 0.56rem /* 42/75 */;
          color: #2c74b9;

          &.disabled {
            color: #999999;
          }
        }
      }
      .form-item:nth-child(3) {
        margin-bottom: 0;
      }
      .submit {
        margin-top: $--size-40;
      }
    }

    .readme {
      text-align: center;
      font-size: $--size-24;
      margin-top: 0.32rem /* 24/75 */;

      .protocal {
        color: #2c74b9;
      }
    }
  }
}
</style>
