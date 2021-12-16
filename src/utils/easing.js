/**
 * 缓动效果定义
 * 参数说明：
 *  t:参数t是指进度=>先设定总的进程，假设是100帧，每播放一帧计数器就+1，那么当前已经播放的帧数/总帧数就是上面缓动函数的参数t
 *  效果请参考：https://matthewlein.com/tools/jquery-easing
 */
const easing = {
  linear: function (t) {
    return t;
  },
  easeInQuad: function (t) {
    return t * t;
  },
  easeOutQuad: function (t) {
    return -1 * t * (t - 2);
  },
  easeInOutQuad: function (t) {
    if ((t /= 1 / 2) < 1) return (1 / 2) * t * t;
    return (-1 / 2) * (--t * (t - 2) - 1);
  },
  easeInCubic: function (t) {
    return t * t * t;
  },
  easeOutCubic: function (t) {
    return 1 * ((t = t / 1 - 1) * t * t + 1);
  },
  easeInOutCubic: function (t) {
    if ((t /= 1 / 2) < 1) return (1 / 2) * t * t * t;
    return (1 / 2) * ((t -= 2) * t * t + 2);
  },
  easeInQuart: function (t) {
    return t * t * t * t;
  },
  easeOutQuart: function (t) {
    return -1 * ((t = t / 1 - 1) * t * t * t - 1);
  },
  easeInOutQuart: function (t) {
    if ((t /= 1 / 2) < 1) return (1 / 2) * t * t * t * t;
    return (-1 / 2) * ((t -= 2) * t * t * t - 2);
  },
  easeInQuint: function (t) {
    return 1 * (t /= 1) * t * t * t * t;
  },
  easeOutQuint: function (t) {
    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
  },
  easeInOutQuint: function (t) {
    if ((t /= 1 / 2) < 1) return (1 / 2) * t * t * t * t * t;
    return (1 / 2) * ((t -= 2) * t * t * t * t + 2);
  },
  easeInSine: function (t) {
    return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
  },
  easeOutSine: function (t) {
    return 1 * Math.sin((t / 1) * (Math.PI / 2));
  },
  easeInOutSine: function (t) {
    return (-1 / 2) * (Math.cos((Math.PI * t) / 1) - 1);
  },
  easeInExpo: function (t) {
    return t === 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
  },
  easeOutExpo: function (t) {
    return t === 1 ? 1 : 1 * (-Math.pow(2, (-10 * t) / 1) + 1);
  },
  easeInOutExpo: function (t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 1 / 2) < 1) return (1 / 2) * Math.pow(2, 10 * (t - 1));
    return (1 / 2) * (-Math.pow(2, -10 * --t) + 2);
  },
  easeInCirc: function (t) {
    if (t >= 1) return t;
    return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
  },
  easeOutCirc: function (t) {
    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
  },
  easeInOutCirc: function (t) {
    if ((t /= 1 / 2) < 1) return (-1 / 2) * (Math.sqrt(1 - t * t) - 1);
    return (1 / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  easeInElastic: function (t) {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t === 0) return 0;
    if ((t /= 1) === 1) return 1;
    if (!p) p = 1 * 0.3;
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    return -(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin(((t * 1 - s) * (2 * Math.PI)) / p)
    );
  },
  easeOutElastic: function (t) {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t === 0) return 0;
    if ((t /= 1) === 1) return 1;
    if (!p) p = 1 * 0.3;
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) + 1
    );
  },
  easeInOutElastic: function (t) {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t === 0) return 0;
    if ((t /= 1 / 2) === 2) return 1;
    if (!p) p = 1 * (0.3 * 1.5);
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    if (t < 1) {
      return (
        -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * 1 - s) * (2 * Math.PI)) / p))
      );
    }
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) *
        0.5 +
      1
    );
  },
  easeInBack: function (t) {
    const s = 1.70158;
    return 1 * (t /= 1) * t * ((s + 1) * t - s);
  },
  easeOutBack: function (t) {
    const s = 1.70158;
    return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
  },
  easeInOutBack: function (t) {
    let s = 1.70158;
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * (t * t * (((s *= 1.525) + 1) * t - s));
    }
    return (1 / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },
  easeInBounce: function (t) {
    return 1 - easing.easeOutBounce(1 - t);
  },
  easeOutBounce: function (t) {
    if ((t /= 1) < 1 / 2.75) {
      return 1 * (7.5625 * t * t);
    } else if (t < 2 / 2.75) {
      return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
    } else if (t < 2.5 / 2.75) {
      return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
    } else {
      return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
    }
  },
  easeInOutBounce: function (t) {
    if (t < 1 / 2) return easing.easeInBounce(t * 2) * 0.5;
    return easing.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
  },
};

export default easing;
