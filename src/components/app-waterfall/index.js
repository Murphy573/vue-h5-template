import AppWaterfall from './index.vue';

AppWaterfall.install = function (Vue) {
  Vue.component(AppWaterfall.name, AppWaterfall);
};

export default AppWaterfall;
