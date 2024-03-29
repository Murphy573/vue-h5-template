<template>
  <div ref="wheelWrapperRef" class="app-lottery-wheel">
    <canvas ref="wheelCanvas">
      您的浏览器不支持canvas，请换一个牛逼一点的浏览器，谢谢
    </canvas>
  </div>
</template>

<script>
import {
  getCanvasPixelRatio,
  transformDeg2Radian,
  drawRadian,
  // transformRadian2Deg
} from '@/utils/canvas.js';
import { loadImg } from '@/utils/file.js';
import { createAnimate } from '@/utils/animate.js';

export default {
  name: 'AppLotteryWheel',

  mixins: [],

  components: {},

  props: {
    // 区块颜色（交错渲染）
    blocks: {
      type: Array,
      default() {
        return [
          this.$_sassVars.colorSecondary,
          this.$_sassVars.colorPrimary,
          this.$_sassVars.colorRegular,
        ];
      },
    },
    padding: {
      type: Number,
      default: 20,
    },
    // 抽奖次数
    times: {
      type: Number,
      default: 1,
    },
    // 奖品：图片列表
    prizes: {
      type: Array,
      default() {
        return [
          'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAgz6zS-QUo7qq5ygIwlgE4lgE.png.webp',
          'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg0qzS-QUozOWQ4QUwlgE4lgE.png.webp',
          'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg1KzS-QUooOP_4wQwlgE4lgE.png.webp',
          'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg2azS-QUovvv1_QYwlgE4lgE.png.webp',
          'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg26zS-QUoz9zb2QQwlgE4lgE.png.webp',
          'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg3qzS-QUo0eLTxQIwlgE4lgE.png.webp',
          // 'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg4azS-QUolevRogYwlgE4lgE.png.webp',
          // 'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg5KzS-QUojLbsjAUwlgE4lgE.png.webp',
          // 'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg5qzS-QUoo5aKgAMwlgE4lgE.png.webp'
          // 'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg6azS-QUoqIKbpAcwlgE4lgE.png.webp',
          // 'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg_oHT-QUoyNemrgEw2gQ42gQ.png.webp'
        ];
      },
    },
    // 预中奖索引
    prizeIndex: {
      type: Number,
      default: -1,
    },
    // 抽奖按钮：图片
    button: {
      type: String,
      default: 'https://hdg.faisys.com/image/shakePageNew/startBtn.png',
    },
    backgroundImg: {
      type: String,
      default:
        'https://25169966.h40.faiusr.com/4/242/ACgIABAEGAAg_oHT-QUoyNemrgEw2gQ42gQ.png.webp',
    },
    // 是否可抽奖
    canLottery: Boolean,
  },

  data() {
    return {
      myTimes: -1,
      isLottering: false,
      // 渲染块大小
      rectSize: {},
      cachedPrizeImgs: [],
      cachedBackgroundImg: null,
      // 绘图对象
      ctx: null,
      // 半径
      radius: 0,
      // 设备像素比
      ratio: 1,
      // 旋转的角度
      rotateDeg: 0,
    };
  },

  computed: {
    // 不可点击抽奖按钮:抽奖状态不等于未抽奖或者没有抽奖次数或者正在抽奖
    cmpt_cannotClickLotteryBtn() {
      return (
        !this.prizes.length ||
        !this.canLottery ||
        this.myTimes < 1 ||
        this.isLottering
      );
    },
  },

  watch: {
    times: {
      handler(v) {
        this.myTimes = v;
      },
      immediate: true,
    },
  },

  mounted() {
    this._initialize();
  },

  methods: {
    async _initialize() {
      try {
        await this._initBase();
        await this._loadAndCachesImgs();
        this._draw();
      } catch (error) {}
    },
    _initBase() {
      const { wheelWrapperRef, wheelCanvas } = this.$refs;

      if (!wheelWrapperRef || !wheelCanvas) return;

      const width = wheelWrapperRef.clientWidth;
      const height = wheelWrapperRef.clientHeight;

      let ctx = wheelCanvas.getContext('2d');
      let ratio = getCanvasPixelRatio(ctx);
      // let ratio = 1;

      wheelCanvas.width = width * ratio;
      wheelCanvas.height = height * ratio;
      wheelCanvas.style.width = width + 'px';
      wheelCanvas.style.height = height + 'px';

      this.ctx = ctx;
      this.ratio = ratio;
      this.radius = (width * ratio) / 2;
      this.rectSize = { width, height };
    },
    async _loadAndCachesImgs() {
      try {
        this.cachedPrizeImgs = [];
        for (let index = 0; index < this.prizes.length; index++) {
          let img = await loadImg(this.prizes[index]);
          this.$set(this.cachedPrizeImgs, index, img);
        }
        this.cachedBackgroundImg = await loadImg(this.backgroundImg);
      } catch (error) {}
    },
    // 开始绘制
    _draw() {
      const {
        ctx,
        radius,
        ratio,
        padding,
        blocks,
        cachedBackgroundImg,
        rectSize,
      } = this;
      // 清空画布
      ctx.clearRect(0, 0, radius * 2, radius * 2);
      // 计算起始弧度
      let perDeg = 360 / this.prizes.length;
      let perRadian = transformDeg2Radian(perDeg);
      let start = transformDeg2Radian(-90 + this.rotateDeg);
      // 绘制背景图片: 增加背景图旋转
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(start);
      ctx.drawImage(
        cachedBackgroundImg,
        -radius,
        -radius,
        radius * 2,
        radius * 2
      );
      ctx.restore();

      ctx.save();
      // 绘制奖品
      this.prizes.forEach((prize, index) => {
        let _startRadian = start + index * perRadian;
        let _endRadian = _startRadian + perRadian;

        // 绘制扇形区块
        ctx.save();
        drawRadian(
          ctx,
          radius,
          radius,
          radius - (rectSize.width / 300) * padding * ratio,
          _startRadian,
          _endRadian,
          !Array.isArray(blocks) || !blocks.length
            ? ''
            : blocks[index % blocks.length]
        );
        ctx.restore();

        // 绘制奖品图片
        const prizeImg = this.cachedPrizeImgs[index];
        if (!prizeImg) return;
        const { width, height } = prizeImg;

        ctx.save();

        const _k = width / height;

        const _magicNumber = 1.35;
        const a = Math.sqrt(
          (1 + Math.sin(perRadian / 2) / Math.sin(perRadian / 2)) * _magicNumber
        );

        const _r =
          (radius - padding) *
          (Math.sin(perRadian / 2) / (1 + Math.sin(perRadian / 2)));

        const _widthToDraw = (2 * _r) / Math.sqrt(1 + Math.pow(_k, 2));
        const _heightToDraw = _widthToDraw * _k;

        let x = radius + Math.cos(_startRadian + perRadian / 2) * (radius / a);
        let y = radius + Math.sin(_startRadian + perRadian / 2) * (radius / a);
        // debugger;
        ctx.translate(x, y);
        ctx.rotate(_startRadian + perRadian / 2 + Math.PI / 2);

        // const k = width / height;
        // const _realHeight = Math.sqrt(radius * Math.sin(perRadian / 2) / (1 + Math.pow(k, 2)));
        // const _realWidth = _realHeight * k;
        // debugger;

        ctx.fillStyle = 'white';
        ctx.fillRect(
          -_widthToDraw / 2,
          -_heightToDraw / 2,
          _widthToDraw,
          _heightToDraw
        );

        ctx.drawImage(
          prizeImg,
          -_widthToDraw / 2,
          -_heightToDraw / 2,
          _widthToDraw,
          _heightToDraw
        );
        // 修正旋转角度和原点坐标
        // ctx.rotate(transformDeg2Radian(360) - _startRadian - transformDeg2Radian(90));
        // ctx.translate(-x, -y);
        ctx.restore();
      });
      ctx.restore();
    },
    startLottery() {
      if (this.rotateDeg !== 0) {
        this.rotateDeg = 0;
        this._draw();
      }

      let { prizeIndex, prizes, rotateDeg } = this;
      let self = this;

      const perDeg = 360 / prizes.length;
      const startDeg = rotateDeg;
      const endDeg = startDeg + 360 * 10 - (prizeIndex * perDeg + perDeg / 2);

      const animateFn = createAnimate(3000);

      const callback = (easing) => {
        self.rotateDeg = (endDeg - startDeg) * easing + startDeg;
        self._draw();
        if (easing === 1) {
          /* eslint-disable-next-line */
          console.log('中奖索引:' + prizeIndex);
        }
      };

      animateFn(callback);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-lottery-wheel {
  width: 100%;
  height: 100%;
}
</style>
