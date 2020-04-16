import AppRadioGroup from './app-radio-group.vue';
import AppRadio from './app-radio.vue';

AppRadioGroup.install = function (Vue) {
  Vue.component(AppRadioGroup.name, AppRadioGroup);
};

AppRadio.install = function (Vue) {
  Vue.component(AppRadio.name, AppRadio);
};

export { AppRadioGroup, AppRadio };
