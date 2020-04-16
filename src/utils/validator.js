/* 校验表单 */
import AsyncValidator from 'async-validator';
import { isObject, isNull } from './common';

/**
 * 校验数据
 * @param {Object} rules 规则对象
 * @param {Object} formData 待校验的数据
 */
export default function (rules, formData) {
  if (
    !isObject(rules) ||
    !isObject(formData) ||
    isNull(rules) ||
    isNull(formData)
  ) {
    return Promise.reject(new Error('规则和表单数据必须为对象!'));
  }
  // 构造校验对象
  const validator = new AsyncValidator(rules);
  // 返回promise
  return new Promise((resolve, reject) => {
    validator.validate(formData, { firstFields: true }, errors => {
      if (errors) {
        reject(errors);
      }
      else {
        resolve();
      }
    });
  });
}
