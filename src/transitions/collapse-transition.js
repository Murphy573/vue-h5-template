// 动画方向与样式key映射
const direction4StyleKeyMapper = {
  vertical: {
    // transition字符串
    transition: {
      main: 'height',
      side1: 'padding-top',
      side2: 'padding-bottom',
    },
    // padding
    padding: {
      p1: {
        newP: 'paddingTop',
        oldP: 'oldPaddingTop',
      },
      p2: {
        newP: 'paddingBottom',
        oldP: 'oldPaddingBottom',
      },
    },
    // 大小
    size: {
      target: 'height',
      container: 'scrollHeight',
    },
  },
  horizontal: {
    // transition字符串
    transition: {
      main: 'width',
      side1: 'padding-left',
      side2: 'padding-right',
    },
    // padding
    padding: {
      p1: {
        newP: 'paddingLeft',
        oldP: 'oldPaddingLeft',
      },
      p2: {
        newP: 'paddingRight',
        oldP: 'oldPaddingRight',
      },
    },
    // 大小
    size: {
      target: 'width',
      container: 'scrollWidth',
    },
  },
};

export default {
  name: 'CollapseTransition',

  functional: true,

  props: {
    // 动画持续时长，单位秒(s)
    duration: {
      type: Number,
      default: 0.2,
    },
    // 动画方向，水平or垂直
    direction: {
      type: String,
      default: 'vertical',
      validate(v) {
        return ['horizontal', 'vertical'].includes(v);
      },
    },
  },

  render(h, { children, props }) {
    const { duration, direction } = props;

    const { transition, padding, size } = direction4StyleKeyMapper[direction];

    const transitionStyle = `${duration}s ${transition.main} ease-in-out,${duration}s ${transition.side1} ease-in-out,${duration}s ${transition.side2} ease-in-out`;

    const data = {
      on: {
        beforeEnter(el) {
          // addClass(el, 'collapse-transition');
          // 添加动画
          el.style.transition = transitionStyle;
          if (!el.dataset) el.dataset = {};

          el.dataset[padding.p1.oldP] = el.style[padding.p1.newP];
          el.dataset[padding.p2.oldP] = el.style[padding.p2.newP];

          el.style[size.target] = '0';
          el.style[padding.p1.newP] = 0;
          el.style[padding.p2.newP] = 0;
        },

        enter(el) {
          el.dataset.oldOverflow = el.style.overflow;
          if (el[size.container] !== 0) {
            el.style[size.target] = el[size.container] + 'px';
            el.style[padding.p1.newP] = el.dataset[padding.p1.oldP];
            el.style[padding.p2.newP] = el.dataset[padding.p2.oldP];
          } else {
            el.style[size.target] = '';
            el.style[padding.p1.newP] = el.dataset[padding.p1.oldP];
            el.style[padding.p2.newP] = el.dataset[padding.p2.oldP];
          }

          el.style.overflow = 'hidden';
        },

        afterEnter(el) {
          // for safari: remove class then reset height is necessary
          // removeClass(el, 'collapse-transition');
          // 移除动画
          el.style.transition = 'none';
          el.style[size.target] = '';
          el.style.overflow = el.dataset.oldOverflow;
        },

        beforeLeave(el) {
          if (!el.dataset) el.dataset = {};
          el.dataset[padding.p1.oldP] = el.style[padding.p1.newP];
          el.dataset[padding.p2.oldP] = el.style[padding.p2.newP];
          el.dataset.oldOverflow = el.style.overflow;

          el.style[size.target] = el[size.container] + 'px';
          el.style.overflow = 'hidden';
        },

        leave(el) {
          if (el[size.container] !== 0) {
            // 添加动画
            el.style.transition = transitionStyle;
            // for safari: add class after set height, or it will jump to zero height suddenly, weired
            // addClass(el, 'collapse-transition');
            el.style[size.target] = 0;
            el.style[padding.p1.newP] = 0;
            el.style[padding.p2.newP] = 0;
          }
        },

        afterLeave(el) {
          // removeClass(el, 'collapse-transition');
          // 移除动画
          el.style.transition = 'none';
          el.style[size.target] = '';
          el.style.overflow = el.dataset.oldOverflow;
          el.style[padding.p1.newP] = el.dataset[padding.p1.oldP];
          el.style[padding.p2.newP] = el.dataset[padding.p2.oldP];
        },
      },
    };

    return h('transition', data, children);
  },
};
