export default [
  // scroll
  {
    path: '/scroll',
    name: 'scroll',
    components: {
      default: () => import('@/views/scroll/index'),
    },
  },
  // fall
  {
    path: '/fall',
    name: 'fall',
    components: {
      default: () => import('@/views/waterfall/index.vue'),
    },
  },
  // wheel
  {
    path: '/wheel',
    name: 'wheel',
    components: {
      default: () => import('@/views/wheel/index.vue'),
    },
  },
];
