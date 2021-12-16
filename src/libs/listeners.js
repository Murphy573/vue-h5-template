// 微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
window.addEventListener('resize', function () {
  if (
    document.activeElement.tagName === 'INPUT' ||
    document.activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(function () {
      document.activeElement.scrollIntoViewIfNeeded();
    }, 0);
  }
});

// function orient () {
//   const BODY = document.body;
//   switch (window.orientation) {
//     case 0:
//       BODY.style.transform = 'rotate(0deg)';
//       BODY.style['-webkit-transform'] = 'rotate(0deg)';
//       break;
//     case 90:
//       BODY.style = 'tranform: rotate(-90deg);';
//       BODY.style['-webkit-transform'] = 'rotate(-90deg)';
//       break;
//     case -90:
//       BODY.style = 'tranform: rotate(90deg);';
//       BODY.style['-webkit-transform'] = 'rotate(90deg)';
//       break;
//     case 180:
//       BODY.style = 'tranform: rotate(-180deg);';
//       BODY.style['-webkit-transform'] = 'rotate(-180deg)';
//       break;
//   }
// }

// window.addEventListener(
//   'orientationchange',
//   function () {
//     orient();
//   },
//   false
// );
