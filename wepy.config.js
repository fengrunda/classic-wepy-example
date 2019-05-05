const path = require('path')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
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
    /* sass: {
      outputStyle: 'compressed'
    }, */
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
    // 使用replace插件将func instanceof Function替换为typeof func === 'function'
    'replace': [
      {
        filter: /moment\.js$/,
        config: {
          find: /([\w[\]a-d.]+)\s*instanceof Function/g,
          replace: function (matchs, word) {
            return ' typeof ' + word + " ==='function' "
          }
        }
      }
    ]
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
    buildType: process.env.APP_BUILD_TYPE // 环境变量
  }
}

if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
