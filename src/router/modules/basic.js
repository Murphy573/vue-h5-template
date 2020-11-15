const Tabbar = () => import('@/views/main/tabbar.vue');
// 路由配置
export default [
  // 主页
  {
    path: '/home',
    name: 'home',
    components: {
      default: () => import('@/views/main/home/index.vue'),
      tabbar: Tabbar
    },
    meta: {
      hasTabbar: true
    }
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    components: {
      default: () => import('@/views/main/my/index.vue'),
      tabbar: Tabbar
    },
    meta: {
      hasTabbar: true
    }
  }
];
