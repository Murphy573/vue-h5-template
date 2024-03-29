// import http from '../utils/http';

/**
 * 用户统一登录
 * phone: 手机号（国拍登录不传）
 * smsCode: 验证码（国拍登录不传）
 * loginMethod: 1：账号密码登录; 2：手机号验证码登录；3：第三放登录;
 * 其余登录参数查看接口文档
 */
export function api_login_byUnified() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'token',
      });
    }, 1000);
  });
  // return http.post('/auth/unifiedLogin', params);
}

/**
 * 获取用户信息
 */
export function api_query_userInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // reject('');
      resolve({
        nickname: 'xxx',
        mobile: '13333333333',
      });
    }, 1000);
  });
  // return http.get('/user/info');
}

/**
 * 登出
 */
export function api_logout() {
  return true;
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 */
export function api_send_smsCodeForLogin() {
  return true;
  // return http.post('/auth/captcha', {
  //   mobile,
  //   type: 1
  // });
}
