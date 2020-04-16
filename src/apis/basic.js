// import http from '../utils/http';

/**
 * 用户统一登录
 * phone: 手机号（国拍登录不传）
 * smsCode: 验证码（国拍登录不传）
 * loginMethod: 1：账号密码登录; 2：手机号验证码登录；3：第三放登录;
 * 其余登录参数查看接口文档
 */
export function api_login_byUnified (params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: 'token',
        userInfo: {
          nickName: 'xxx'
        }
      });
    }, 1000);
  });
  // return http.post('/auth/unifiedLogin', params);
}

/**
 * 登出
 */
export function api_logout () {
  return true;
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 */
export function api_send_smsCodeForLogin (mobile) {
  return true;
  // return http.post('/auth/captcha', {
  //   mobile,
  //   type: 1
  // });
}
