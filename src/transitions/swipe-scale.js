/* 渐隐放大切换动画 */
export default {
  name: 'SwipeScaleTransition',

  functional: true,

  props: {
    mode: {
      type: String,
      default: 'out-in'
    },
    appear: {
      type: Boolean,
      default: true
    },

    duration: {
      type: [Number, Object],
      default () {
        return 200;
      }
    },
    css: {
      type: Boolean,
      default: true
    }
  },

  render (createElement, context) {
    const data = {
      props: { ...context.props },

      on: {
        /* 进入动画之前 */
        beforeEnter (el) {
          el.style.transformOrigin = 'center';
          el.style.transform = 'scale(0)';
        },
        /* 进入动画中 */
        enter (el, done) {
          /* eslint-disable-next-line */
          el.offsetWidth;
          el.style.transform = 'scale(1)';
          el.style.transition = `transform ${context.props.duration /
            1000}s ease-out`;
          done();
        },
        /* 离开中 */
        leave (el, done) {
          el.style.transform = 'scale(0)';
          el.style.transition = 'transform 0.2s ease-in';
          done();
        }
      }
    };

    return createElement('transition', data, context.children);
  }
};
