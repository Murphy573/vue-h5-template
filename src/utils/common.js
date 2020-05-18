export function noop () {}

export function transferTargetType (target) {
  return Object.prototype.toString.call(target);
}

export function isString (target) {
  return typeof target === 'string';
}

export function isObject (target) {
  return transferTargetType(target) === '[object Object]';
}

export function isNull (target) {
  return transferTargetType(target) === '[object Null]';
}

export function isUndefined (target) {
  return transferTargetType(target) === '[object Undefined]';
}

export function isArray (target) {
  return transferTargetType(target) === '[object Array]';
}

export function isRegExp (target) {
  return transferTargetType(target) === '[object RegExp]';
}

export function isDate (target) {
  return transferTargetType(target) === '[object Date]';
}

export function isFunction (target) {
  return transferTargetType(target) === '[object Function]';
}

export function isBoolean (target) {
  return transferTargetType(target) === '[object Boolean]';
}

// 判断是否是数字：数字字符串也认为是数字
export function isNumber (target) {
  return /^(((-[1-9]\d*)|(\d+))(\.\d+)?)$/.test(target);
}

export function isPlainObj (target) {
  return !isNull(target) && isObject(target);
}

/**
 * 是否定义
 */
export function isDef (value) {
  return !isUndefined(value) && !isNull(value);
}
