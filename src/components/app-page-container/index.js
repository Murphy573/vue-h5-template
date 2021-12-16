import AppPageContainer from './index.vue';

AppPageContainer.install = function (Vue) {
  Vue.component(AppPageContainer.name, AppPageContainer);
};

export default AppPageContainer;
