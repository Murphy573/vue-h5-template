export default {
  data() {
    return {
      directionMixin: '',
      MIN_DISTANCE_MIXIN: 10,
    };
  },

  methods: {
    touchStartMixin(event) {
      this.resetTouchStatusMixin();
      this.startXMixin = event.touches[0].clientX;
      this.startYMixin = event.touches[0].clientY;
    },

    touchMoveMixin(event) {
      const touch = event.touches[0];
      this.deltaXMixin = touch.clientX - this.startXMixin;
      this.deltaYMixin = touch.clientY - this.startYMixin;
      this.offsetXMixin = Math.abs(this.deltaXMixin);
      this.offsetYMixin = Math.abs(this.deltaYMixin);
      this.directionMixin =
        this.directionMixin ||
        this.getDirectionMixin(this.offsetXMixin, this.offsetYMixin);
    },

    resetTouchStatusMixin() {
      this.directionMixin = '';
      this.deltaXMixin = 0;
      this.deltaYMixin = 0;
      this.offsetXMixin = 0;
      this.offsetYMixin = 0;
    },

    getDirectionMixin(x, y) {
      if (x > y && x > this.MIN_DISTANCE_MIXIN) {
        return 'horizontal';
      }
      if (y > x && y > this.MIN_DISTANCE_MIXIN) {
        return 'vertical';
      }
      return '';
    },
  },
};
