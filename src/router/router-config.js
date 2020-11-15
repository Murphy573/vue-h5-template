import Basic from './modules/basic';
import Other from './modules/other';
// 路由配置
export default [
  ...Basic,
  ...Other,
  {
    path: '*',
    redirect: {
      name: 'home',
      replace: true
    }
  }
];
