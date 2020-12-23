
/**
 * 获取canvas像素比
 * @param {CanvasRenderingContext2D} context canvas.getContext('2d') 获取的渲染对象
 */
export function getCanvasPixelRatio (context) {
  if (!CanvasRenderingContext2D.prototype ||
    !(context instanceof CanvasRenderingContext2D)) return 1;

  const backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;

  return (window.devicePixelRatio || 1) / backingStore;
}

/**
 *  角度转弧度
 * @param {Number} deg 角度
 */
export function transformDeg2Radian (deg) {
  return deg * (Math.PI * 2 / 360);
}

/**
 * 弧度转角度
 * @param {Number} radian 弧度
 */
export function transformRadian2Deg (radian) {
  return radian * (360 / (Math.PI * 2));
}

/**
 * 画圆弧
 * @param {*} ctx
 * @param {Number} x 中心x坐标
 * @param {Number} y 中心y坐标
 * @param {Number} radius 半径
 * @param {Number} startRadian 其实弧度
 * @param {Number} endRadian 结束弧度
 * @param {String} fillStyle 填充色
 */
export function drawRadian (ctx, x, y, radius, startRadian, endRadian, fillStyle) {
  if (!fillStyle) {
    fillStyle = 'transparent';
  }
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, startRadian, endRadian);
  ctx.fillStyle = fillStyle;
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
