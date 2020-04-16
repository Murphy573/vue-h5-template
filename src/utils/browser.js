// 是否是微信浏览器
export const IS_WX_BROWSER = /MicroMessenger/gi.test(navigator.userAgent);

/**
 * 获取浏览器类型
 */
export function getUA () {
  /* eslint-disable */
  let test = {
      ipad: /iPad/gi.test(navigator.appVersion),
      iphone: /iPhone/gi.test(navigator.appVersion),
      android: /android/gi.test(navigator.userAgent),
      safari:
        /Safari/i.test(navigator.userAgent) &&
        /iPhone\sOS/.test(navigator.userAgent),
      weixin: /MicroMessenger/gi.test(navigator.userAgent)
    },
    result = '';

  for (let r in test) {
    test[r] && (result = r);
  }

  return result;
}

// 判断是否安卓终端
export function isAndroid() {
  return /android/.test(navigator.userAgent.toLowerCase());
}

// 判断是否ios终端
export function isIOS() {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

// 地理位置
export function getGeoLocation() {
  /* eslint-disable */
  return new Promise((resolve, reject) => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        function(position) {
          let _longitude = position.coords.longitude,
            _latitude = position.coords.latitude;
          alert(
            `H5获取的地理位置信息为：${JSON.stringify({
              latitude: _latitude,
              longitude: _longitude
            })}`
          );
          resolve({
            latitude: _latitude,
            longitude: _longitude
          });
        },
        function(e) {
          // alert(`H5获取的地理位置失败，错误信息为：${e.message}`);
          reject(e);
        }
      );
    } else {
      reject(new Error('浏览器不支持H5获取的地理位置信息'));
    }
  });
  /* eslint-enable */
}
