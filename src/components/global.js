/* 全局组件 */
import Vue from 'vue';
import AppPageContainer from './app-page-container/index.js';
import AppHeader from './app-header/index.js';
import AppButton from './app-button/index.js';
import { AppRadioGroup, AppRadio } from './app-radio/index';
import { AppCheckboxGroup, AppCheckbox } from './app-checkbox/index';
import AppImage from './app-image/index';
import AppIcon from './app-icon/index.js';

const components = [
  AppPageContainer,
  AppHeader,
  AppButton,
  AppRadioGroup,
  AppRadio,
  AppCheckboxGroup,
  AppCheckbox,
  AppImage,
  AppIcon
];

components.forEach(component => {
  Vue.component(component.name, component);
});
