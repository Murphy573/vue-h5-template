<template>
  <van-list
    v-model="myLoading"
    :error.sync="error"
    :finished="finished"
    :offset="offset"
    :loading-text="loadingText"
    :finished-text="finishedText"
    :error-text="errorText"
    :immediate-check="immediateCheck"
    @load="$emit('load', $event)">
    <AppWaterfallWrapper v-bind="$attrs" @rendering="handleRendering">
      <template #default="{ data, index }">
        <slot :data="data" :index="index"></slot>
      </template>
    </AppWaterfallWrapper>
  </van-list>
</template>

<script>
import AppWaterfallWrapper from './waterfall-wrapper';

export default {
  name: 'AppWaterfall',

  model: {
    prop: 'loading',
  },

  components: { AppWaterfallWrapper },

  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: {
      type: String,
      default: '哦豁，加载失败了呢，点我试试～',
    },
    loadingText: {
      type: String,
      default: '加载中...',
    },
    finishedText: {
      type: String,
      default: '没有更多了~',
    },
    // 是否立即检查
    immediateCheck: {
      type: Boolean,
      default: true,
    },
    // 距离底部
    offset: {
      type: Number,
      default: 300,
    },
  },

  data() {
    return {
      isRendering: false,
    };
  },

  computed: {
    myLoading: {
      set(v) {
        this.$emit('input', v);
      },
      get() {
        return this.loading || this.isRendering;
      },
    },
  },

  methods: {
    handleRendering(r) {
      this.isRendering = r;
    },
  },
};
</script>
