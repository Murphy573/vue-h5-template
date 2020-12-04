// 移动端适配解决方案
import './libs/flexible';
// 全局事件监听
import './libs/listeners';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import './router/router-event';
// 指令
import './directives';
// 引入全局filter
import './filters';
// 引入全局组件
import './components/global';
// 引入vant使用的组件
import './libs/vant';
// 第三方接入JS
import './libs/third-access/third-access-comm.js';
// 引入全局css
import './styles/index.scss';
import './assets/svg/index.js';
// 从scss变量中引入定义的样式变量
import styles from './styles/var.scss';

Vue.config.productionTip = false;
// 注册到vue原型上
Vue.prototype.$_sassVars = styles;

// 设置样式关键字
// window.document.documentElement.setAttribute('data-theme', 'default');

/* eslint-disable no-new */
// 加入移动端调试工具:生产环境中添加
if (process.env.VUE_APP_Show_VConsole === 'true') {
  const VCsl = require('vconsole');
  new VCsl();
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
