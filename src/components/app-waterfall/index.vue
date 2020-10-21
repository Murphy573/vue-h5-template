<template>
  <div class="app-waterfall-wrapper">
    <van-list v-model="myLoading"
      :error.sync="error"
      :finished="finished"
      :offset="offset"
      :loading-text="loadingText"
      :finished-text="finishedText"
      :error-text="errorText"
      :immediate-check="immediateCheck"
      @load="$emit('load', $event)">
      <div class="wrapper">
        <!-- 瀑布流 -->
        <div class="waterfall clearfix"
          ref="waterfall"
          :style="wrapperStyle">
          <!-- 列 -->
          <div v-for="(col, index) in renderList"
            class="column"
            :style="colStyle"
            :ref="'column' + index"
            :key="'column' + index">
            <!-- 元素 -->
            <div v-for="(item, index) of col"
              :key="genKey(item)"
              :style="itemStyle"
              class="item clearfix">
              <slot :data="item"
                :index="index"></slot>
            </div>
          </div>
        </div>
      </div>

    </van-list>
  </div>
</template>

<script>
import { isDef } from '@/utils/common';
import { addUnit } from '@/utils/dom';

export default {
  name: 'AppWaterfall',

  model: {
    prop: 'loading'
  },

  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: {
      type: String,
      default: '哦豁，加载失败了呢，点我试试～'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finishedText: {
      type: String,
      default: '没有更多了~'
    },
    // 是否立即检查
    immediateCheck: {
      type: Boolean,
      default: true
    },
    // 距离底部
    offset: {
      type: Number,
      default: 300
    },
    // 是否正在渲染
    rendering: Boolean,
    // 列数
    cols: {
      type: Number,
      default: 2,
      validator (v) {
        return v >= 2;
      }
    },
    // 列与列之间的间隔
    gutter: {
      type: Number,
      default: 0,
      validator (v) {
        return v >= 0;
      }
    },
    // 数据每一项距离下方margin
    itemMarginBottom: [Number, String],
    // 数据列表
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    // 数据每一项的key
    dataKey: {
      type: [String, Function],
      required: true,
      default () {
        return '';
      }
    },
    // 是否按照高度填充，否则将根据索引
    justify: Boolean
  },

  data () {
    return {
      // 渲染的二维数组
      renderList: [],
      // 是否已经初始化
      ininted: false,
      // 每列高度
      colsHeight: [],
      // 是否正在渲染
      isRendering: false,
      // 最后一次渲染的索引
      lastRenderIndex: 0
    };
  },

  computed: {
    wrapperStyle () {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    },
    colStyle () {
      let style = {};

      if (this.gutter) {
        style.paddingLeft = this.gutter / 2 + 'px';
        style.paddingRight = style.paddingLeft;
      }

      style.width = 100 / this.cols + '%';

      return style;
    },
    itemStyle () {
      let style = {};

      if (isDef(this.itemMarginBottom)) {
        style.marginBottom = addUnit(this.itemMarginBottom);
      }
      return style;
    },
    myLoading: {
      set (v) {
        this.$emit('input', v);
      },
      get () {
        return this.loading || this.isRendering;
      }
    }
  },

  watch: {
    data: {
      immediate: true,
      handler (arr) {
        if (!arr || !arr.length) {
          this.reset();
        }
        if (!this.ininted) {
          this.init();
        }
        this.append();
      }
    }
  },

  methods: {
    // 初始化二维渲染数组
    init () {
      for (let i = 0; i < this.cols; i++) {
        this.renderList.push([]);
        this.colsHeight.push(0);
      }
      this.ininted = true;
    },
    reset () {
      this.renderList.forEach(arr => arr.splice(0));
      this.colsHeight = this.colsHeight.map(() => 0);
      this.lastRenderIndex = 0;
      this.isRendering = false;
    },
    genKey (item) {
      if (typeof this.dataKey === 'string') {
        return item[this.dataKey];
      }
      return this.dataKey(item);
    },
    async _appendByIndex () {
      try {
        this.isRendering = true;

        let { data, cols, lastRenderIndex: start } = this;
        let end = data.length;

        for (; start < end; start++) {
          const colIndex = start % cols;
          this.renderList[colIndex].push(data[start]);
          await new Promise((resolve, reject) => {
            // 强制渲染
            /* eslint-disable-next-line */
            this.$refs.waterfall.offsetHeight;
            this.$nextTick(() => {
              resolve();
            });
          });
          this.lastRenderIndex++;
        }

        this.isRendering = false;
      }
      catch (error) { }
    },
    async _appendByJustify (data) {
      try {
        this.isRendering = true;

        let { data, lastRenderIndex: start, colsHeight } = this;
        let end = data.length;

        for (; start < end; start++) {
          const first = data[start];
          const minHeight = Math.min.apply(null, colsHeight);
          const minHeightColIndex = this.getMinhIndex(colsHeight, minHeight);
          // 添加到最小高度列
          this.renderList[minHeightColIndex].push(first);

          const targetCol = this.$refs['column' + minHeightColIndex][0];

          await new Promise((resolve, reject) => {
            // 强制渲染
            /* eslint-disable-next-line */
            targetCol.offsetHeight;
            this.$nextTick(() => {
              colsHeight.splice(minHeightColIndex, 1, targetCol.offsetHeight);
              resolve();
            });
          });
          this.lastRenderIndex++;
        }
        this.isRendering = false;
      }
      catch (error) { }
    },
    // 获取高度最小索引函数
    getMinhIndex (arr, value) {
      return arr.findIndex(h => h === value);
    },
    append () {
      if (!Array.isArray(this.data) || !this.data.length) return;

      if (!this.justify) {
        this._appendByIndex();
      }
      else {
        this._appendByJustify();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-waterfall-wrapper {
  position: relative;
  width: 100%;

  .wrapper {
    overflow-x: hidden;

    .waterfall {
      position: relative;
      box-sizing: border-box;

      .column {
        float: left;
        box-sizing: border-box;

        .item {
          overflow: hidden;
          width: 100%;
        }
      }
    }
  }
}
</style>
