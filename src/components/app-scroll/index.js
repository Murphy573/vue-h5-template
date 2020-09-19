import AppScroll from './scroll.vue';

AppScroll.install = function (Vue) {
  Vue.component(AppScroll.name, AppScroll);
};

export default AppScroll;
