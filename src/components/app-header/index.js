import AppHeader from './index.vue';

AppHeader.install = function (Vue) {
  Vue.component(AppHeader.name, AppHeader);
};

export default AppHeader;
