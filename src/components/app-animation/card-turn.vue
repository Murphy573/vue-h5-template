<template>
  <div
    class="app-card-turn"
    ref="appCardTurn"
    :style="cmpt_cardStyle"
    :class="cmpt_cardClass">
    <div class="card-face card-face--front">
      <slot name="front"></slot>
    </div>
    <div class="card-face card-face--back">
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCardTurn',

  props: {
    // 翻转方向
    direction: {
      type: String,
      default: 'horizontal',
      validate(v) {
        return ['horizontal', 'vertical'].includes(v);
      },
    },
    // 翻转动画持续时间：单位ms
    duration: Number,
  },

  data() {
    return {
      turned: false,
    };
  },

  computed: {
    cmpt_cardStyle() {
      const style = {
        '--init-totate':
          this.direction === 'horizontal'
            ? 'rotateY(180deg)'
            : 'rotateX(180deg)',
        '--duration': `${this.duration || 500}ms`,
      };
      return style;
    },
    cmpt_cardClass() {
      return this.turned ? 'turned' : '';
    },
  },
  methods: {
    turn() {
      this.turned = !this.turned;
    },
    reset(flag = false) {
      this.turned = flag;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-card-turn {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all var(--duration, 0.5s) ease-in-out;
  transform-style: preserve-3d;

  &.turned {
    transform: perspective(800px) var(--init-totate);
  }

  .card-face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;

    &--front {
      z-index: 10;
    }

    &--back {
      z-index: 1;
      transform: var(--init-totate);
    }
  }
}
</style>
