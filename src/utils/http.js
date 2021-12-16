import Vue from 'vue';
import axios from 'axios';
import store from '../store';
import {
  SUCCESS,
  TOKEN_TIMEOUT,
  FORBIDDEN_TOAST_CODES,
} from '../configs/http-code';

// 设置http get请求不缓存
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get.Pragma = 'no-cache';

const http = axios.create({
  baseURL: '/autocloud',
  timeout: 30000,
});

/**
 * 展示错误消息
 * @param {String} msg 错误消息
 */
function showErrorMsg(msg = '') {
  if (!msg) return;
  Vue.prototype.$toast({
    message: msg,
    position: 'middle',
    duration: 2000,
  });
}

// 配置自定义头
function setCustomHeaders(req) {
  req.headers['Custom-Token'] = `${store.getters.vx_gt_getToken || ''}`;
}

// 请求前进行拦截
http.interceptors.request.use(
  (req) => {
    setCustomHeaders(req);
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * 响应后进行统一拦截
 * 假如后台返回的数据对象为：
 *    {
        code: string;
        content: object;
        message: string;
      }
 */
http.interceptors.response.use(
  (res) => {
    const _code = res.code;
    if (_code !== SUCCESS) {
      if (_code === TOKEN_TIMEOUT) {
        store.dispatch('vx_ac_FrontendLogout');
      } else if (!FORBIDDEN_TOAST_CODES.includes(_code)) {
        // 这里对具体不为成功的响应码进行处理,可以做提示信息操作
        showErrorMsg(res.message);
      }
      return Promise.reject(res);
    } else {
      return Promise.resolve(res.content);
    }
  },
  (error) => {
    showErrorMsg(
      process.env.NODE_ENV === 'production'
        ? '系统开小差了，请联系客服人员'
        : error.message
    );
    return Promise.reject(error);
  }
);

export default http;
