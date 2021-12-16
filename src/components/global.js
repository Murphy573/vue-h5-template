/* 全局组件 */
import Vue from 'vue';
import AppPageContainer from './app-page-container/index.js';
import AppHeader from './app-header/index.js';
import AppButton from './app-button/index.js';
import AppImage from './app-image/index';
import AppIcon from './app-icon/index.js';
import AppWaterfall from './app-waterfall/index.js';
import AppScroll from './app-scroll/index.js';

const components = [
  AppPageContainer,
  AppHeader,
  AppButton,
  AppImage,
  AppIcon,
  AppWaterfall,
  AppScroll,
];

components.forEach((component) => {
  Vue.component(component.name, component);
});
