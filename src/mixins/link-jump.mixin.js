/* 配置的链接跳转方法 */

const URL_PATTERN = /^(http|https):\/\/([\w.]+\/?)\S*$/;
// 内部链接前缀
const INTERNAL_LINK_PREFIX =
  process.env.VUE_APP_Router_Mode === 'history' ? '' : '#';

export const LinkJumpMixin = {
  methods: {
    linkJumpMixin (link) {
      if (!link) return;

      let url = link.replace(window.location.origin, '');
      // 外部链接
      if (URL_PATTERN.test(url)) {
        window.location.href = url;
      }
      else {
        let firstChar = url.charAt(0);
        url = firstChar === '/' ? url : `/${url}`;

        let urlPath = url.substring(0, url.indexOf('?'));
        let { path } = this.$route;
        // 比较path是否相同，相同就replace，否则push
        if (urlPath === path) {
          this.$router.replace(`${INTERNAL_LINK_PREFIX}${url}`);
          return;
        }
        this.$router.push(`${INTERNAL_LINK_PREFIX}${url}`);
      }
    }
  }
};
