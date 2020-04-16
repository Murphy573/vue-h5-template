import AppCheckboxGroup from './app-checkbox-group.vue';
import AppCheckbox from './app-checkbox.vue';

AppCheckboxGroup.install = function (Vue) {
  Vue.component(AppCheckboxGroup.name, AppCheckboxGroup);
};

AppCheckbox.install = function (Vue) {
  Vue.component(AppCheckbox.name, AppCheckbox);
};

export { AppCheckboxGroup, AppCheckbox };
