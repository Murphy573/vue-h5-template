import _cloneDeep from 'lodash.clonedeep';

/**
 * 深拷贝
 * @param {Object} target 目标拷贝对象
 */
export function deepClone(target) {
  return _cloneDeep(target);
}

/**
 * 根据路径path获取路径对应的值
 * @param {Object} obj 目标对象
 * @param {String} path 路径，exmp: a.b.c
 * @param {Boolean} strict 严格模式
 */
export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}
