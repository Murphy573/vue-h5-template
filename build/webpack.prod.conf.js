const path = require('path');
const OS = require('os');
// 环境变量
const ENV = process.env;
// tree-shaking
const HappyPack = require('happypack');
// gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length });
const resolve = dir => path.join(__dirname, dir);

// webpack plugins
let _plugins = [
  new HappyPack({
    id: 'happybabel',
    loaders: [
      {
        loader: 'babel-loader?cacheDirectory=true'
      }
    ],
    threadPool: happyThreadPool,
    verbose: true
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer'
  })
];

// 如果执行build命令，添加gzip压缩
if (ENV.VUE_APP_ENV === 'production') {
  const _cwp = new CompressionWebpackPlugin({
    algorithm: 'gzip',
    deleteOriginalAssets: true,
    threshold: 0,
    minRatio: 1,
    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$')
  });
  _plugins.push(_cwp);
}

module.exports = {
  // externals: {
  //   vue: 'Vue',
  //   vuex: 'Vuex',
  //   'vue-router': 'VueRouter',
  //   'element-ui': 'ELEMENT'
  // },
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    splitChunks: {
      chunks: 'all',
      // minChunks: 2,
      // minSize: 20000,
      // maxAsyncRequests: 20,
      // maxInitialRequests: 30,
      // name: false,
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
          name: 'vue-vendor',
          chunks: 'all',
          priority: 20
        },
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve('src'),
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel'
      }
    ]
  },
  plugins: _plugins
};
