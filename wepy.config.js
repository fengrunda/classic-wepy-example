const path = require('path')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const PluginUglifyjs = require('@wepy/plugin-uglifyjs')
const DefinePlugin = require('@wepy/plugin-define')
var prod = process.env.NODE_ENV === 'production'
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('process.env.APP_BUILD_TYPE', process.env.APP_BUILD_TYPE)
module.exports = {
  wpyExt: '.wpy',
  static: ['./src/statics'],
  eslint: true,
  cliLogs: !prod,
  build: {
  },
  resolve: {
    alias: {
      // counter: path.join(__dirname, 'src/components/counter'),
      STAITICS: path.join(__dirname, 'src/statics'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod,
      plugins: [new LessPluginAutoPrefix({ browsers: ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6'] })] // autoprefix
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: [
    // PluginUglifyjs({
    //   // filter: /^((?!watchman).)+\.js$/
    // }),
    DefinePlugin({
      'process.env.APP_BUILD_TYPE': JSON.stringify(process.env.APP_BUILD_TYPE),
    })
  ]
}
if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins.push(PluginUglifyjs())
}
