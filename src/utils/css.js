/* css相关转换 */
import { isNumber } from './common';
// 设计稿都以750设计，前端把屏幕分为10等份，那么一份就是75;
const BASE = 75;

/**
 * px转rem
 * @param {String} value 样式值
 * @param {Number} base 基准值
 */
export function formatPx2Rem(value, base = BASE) {
  if (!value) return value;

  base = isNumber(base) ? Number(base) : 1;
  if (base <= 1) {
    return value;
  }

  return value.replace(/(\d+(\.\d+)?px)/g, (pxValue) => {
    let _value = pxValue.slice(0, -2);
    if (isNumber(_value)) {
      _value = Number(_value);

      if (_value === 0) return 0;

      return _value / base + 'rem';
    }
    return pxValue;
  });
}
