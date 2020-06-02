/* 数学基本运算 */
import { isNumber } from './common';

/**
 * 乘法
 * @param {Number} num1
 * @param {Number} num2
 */
export const times = (num1, num2) => {
  if (!isNumber(num1) || !isNumber(num2)) {
    return 0;
  }
  const num1String = num1.toString();
  const num2String = num2.toString();
  const num1Digits = (num1String.split('.')[1] || '').length;
  const num2Digits = (num2String.split('.')[1] || '').length;
  const baseNum = Math.pow(10, num1Digits + num2Digits);

  return (
    (Number(num1String.replace('.', '')) *
      Number(num2String.replace('.', ''))) /
    baseNum
  );
};

/**
 * 除法
 * @param {Number} num1
 * @param {Numebr} num2
 */
export const divide = (num1, num2) => {
  if (!isNumber(num1) || !isNumber(num2)) {
    return 0;
  }

  const num1String = num1.toString();
  const num2String = num2.toString();
  const num1Digits = (num1String.split('.')[1] || '').length;
  const num2Digits = (num2String.split('.')[1] || '').length;
  const baseNum = Math.pow(10, num1Digits + num2Digits);

  const n1 = times(num1, baseNum);
  const n2 = times(num2, baseNum);

  return Number(n1) / Number(n2);
};

/**
 * 加法
 * @param {Number} num1
 * @param {Number} num2
 */
export const plus = (num1, num2) => {
  if (!isNumber(num1) || !isNumber(num2)) {
    return 0;
  }
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));

  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
};

/**
 * 减法
 * @param {Number} num1
 * @param {Number} num2
 */
export const minus = (num1, num2) => {
  if (!isNumber(num1) || !isNumber(num2)) {
    return 0;
  }
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));

  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
};
