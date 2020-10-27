module.exports = {
  plugins: {
    autoprefixer: {},
    // 配置参考：https://github.com/cuth/postcss-pxtorem/
    'postcss-pxtorem': {
      // 设计稿750/10
      rootValue: 75,
      // 保留小数位数
      unitPrecision: 6,
      // 所有包含px的属性
      propList: ['*'],
      // 忽略的样式类名
      selectorBlackList: [
        // 包含app-的类名
        'app-',
        'van-',
        '--ignore',
        'iconfont'
      ],
      replace: true,
      // 是否转换@mediaQuery
      mediaQuery: false,
      // 最小像素值
      minPixelValue: 0,
      // 忽略的路径：vant
      exclude: /node_modules/i
    }
  }
};
