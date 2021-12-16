import AppButton from './index.vue';

AppButton.install = function (Vue) {
  Vue.component(AppButton.name, AppButton);
};

export default AppButton;
