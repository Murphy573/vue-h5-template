import Vue from 'vue';
import axios from 'axios';
import store from '../store';
// import {isString} from './common';
import {
  SUCCESS_CODE,
  FORBIDDEN_TOAST_CODES,
  CODE_401,
  CODE_402,
  CODE_502,
  CODE_501
} from '../configs/http-code';
// import { CHANNEL_NO_CURRENT } from '@/configs/channel';

// 设置http get请求不缓存
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get['Pragma'] = 'no-cache';

const http = axios.create({
  baseURL: '/wx',
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
  req.headers['Umall-Client-Token'] = `${store.getters.vx_gt_getToken || ''}`;
  req.headers['Umall-Cdomain-Name'] = `${store.getters.vx_gt_shopIdentifier ||
    ''}`;
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
    let _data = res.data,
      _code = _data.errno;
    if (_code !== SUCCESS_CODE) {
      if (!FORBIDDEN_TOAST_CODES.includes(_code)) {
        // 这里对具体不为成功的响应码进行处理,可以做提示信息操作
        if (_code === CODE_401) {
          showErrorMsg('参数不对');
        }
        else if (_code === CODE_402) {
          showErrorMsg('参数值不对');
        }
        else if (_code === CODE_502) {
          showErrorMsg('网站内部错误，请联系网站维护人员');
        }
        else if (_code === CODE_501) {
          store.dispatch('vx_ac_FrontendLogout');
          store.dispatch('vx_ac_SetShowLoginPanel', true);
          // showErrorMsg(_data.errmsg);
        }
        else {
          showErrorMsg(_data.errmsg);
        }
      }
      return Promise.reject(_data);
    }
    else {
      return Promise.resolve(_data.data);
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
