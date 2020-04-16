/* 组件通用mixin */
import { deepClone } from '@/utils/object';
import { URL_PATTERN } from '@/configs/pattern';
// 内部链接前缀
const INTERNAL_LINK_PREFIX =
  process.env.VUE_APP_Router_Mode === 'history' ? '' : '#';

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  computed: {
    cmpt_finalData () {
      let _data = deepClone(this.data);
      try {
        _data.css = JSON.parse(_data.css);
        _data.sectionItemList = _data.sectionItemList.map(item => {
          item.css = JSON.parse(item.css);
          return item;
        });
        return _data;
      }
      catch (error) {}
    }
  },

  methods: {
    pageJumpMixin (url) {
      if (!url) return;
      // 外部链接
      if (URL_PATTERN.test(url)) {
        window.location.href = url;
      }
      else {
        this.$router.push(`${INTERNAL_LINK_PREFIX}${url}`);
      }
    }
  }
};
