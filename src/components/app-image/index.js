import AppImage from './index.vue';

AppImage.install = function (Vue) {
  Vue.component(AppImage.name, AppImage);
};

export default AppImage;
