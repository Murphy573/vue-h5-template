import Vue from 'vue';
import axios from 'axios';
import store from '../store';
// import {isString} from './common';
import {
  SUCCESS,
  TOKEN_TIMEOUT,
  FORBIDDEN_TOAST_CODES
} from '../configs/http-code';
// import { CHANNEL_NO_CURRENT } from '@/configs/channel';

// 设置http get请求不缓存
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get.Pragma = 'no-cache';

const http = axios.create({
  baseURL: '/autocloud',
  timeout: 30000
});

/**
 * 拼接token
 * @param {String} url 请求路径
 */
// function appendExternals (url) {
//   if (!url || !isString(url)) return url;
//   // 城市ID
//   let _cityId = store.getters.vx_gt_getCity
//     ? store.getters.vx_gt_getCity.cityId
//     : '';
//   // 地理位置
//   let _geoLocation = store.getters.vx_gt_getGeoLocation,
//     _longitude = _geoLocation ? _geoLocation.longitude : '',
//     _latitude = _geoLocation ? _geoLocation.latitude : '';

//   // url拼接后缀
//   let _urlSuffix =
//     'token=' +
//     store.getters.vx_gt_getToken +
//     '&cityId=' +
//     _cityId +
//     '&longitude=' +
//     _longitude +
//     '&latitude=' +
//     _latitude +
//     '&channelNo=' +
//     (CHANNEL_NO_CURRENT || '');
//   return `${url}${url.indexOf('?') > -1 ? '&' : '?'}${_urlSuffix}`;
// }

/**
 * 展示错误消息
 * @param {String} msg 错误消息
 */
function showErrorMsg (msg = '') {
  if (!msg) return;
  Vue.prototype.$toast({
    message: msg,
    position: 'middle',
    duration: 2000
  });
}

// 配置自定义头
function setCustomHeaders (req) {
  req.headers['Custom-Token'] = `${store.getters.vx_gt_getToken || ''}`;
}

// 请求前进行拦截
http.interceptors.request.use(
  req => {
    setCustomHeaders(req);
    // 如果配置了不拼接，直接返回
    if (req.CUSTOM_CONFIG && req.CUSTOM_CONFIG.notAppend) {
      return req;
    }
    // 在这里对请求前URL进行统一拼接
    // req.url = appendExternals(req.url);
    return req;
  },
  error => {
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
  res => {
    const _data = res.data,
      _code = _data.code;
    if (_code !== SUCCESS) {
      if (_code === TOKEN_TIMEOUT) {
        store.dispatch('vx_ac_FrontendLogout');
      }
      else if (!FORBIDDEN_TOAST_CODES.includes(_code)) {
        // 这里对具体不为成功的响应码进行处理,可以做提示信息操作
        showErrorMsg(_data.message);
      }
      return Promise.reject(_data);
    }
    else {
      return Promise.resolve(_data.content);
    }
  },
  error => {
    showErrorMsg(
      process.env.NODE_ENV === 'production'
        ? '系统开小差了，请联系客服人员'
        : error.message
    );
    return Promise.reject(error);
  }
);

export default http;
