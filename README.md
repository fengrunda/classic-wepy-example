# classic-wepy-example

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run dev
```

### Compiles and minifies for production
```
yarn run build
```

### Compiles and minifies for production (测试环境)
```
yarn run build-test
```

### Clean build files
```
yarn run clean
```

## 目录结构
```
|-- root
    |-- .editorconfig
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .gitignore
    |-- .prettierrc
    |-- .wepycache
    |-- .wepyignore
    |-- package-lock.json
    |-- package.json
    |-- project.config.json
    |-- README.md
    |-- wepy.config.js // wepy配置文件
    |-- src
        |-- app.wpy
        |-- assets
        |   |-- images // 图片文件
        |       |-- 
        |   |-- less
        |       |-- lib-base.less // less常量
        |       |-- lib-func.less // 直接return的less方法，基于less-plugin-functions
        |       |-- lib-mixins.less // 注入使用的less方法
        |       |-- lib-reset.less // 初始化reset
        |       |-- lib-ui.less // 常用的样式，命名方式参照emmet
        |       |-- style.less // 全局公共样式
        |-- components // 主包组件
        |   |-- navCustom.wpy // 自定义返回按钮
        |   |-- tabBar.wpy // 自定义tabbar
        |-- config
        |   |-- api.js // api接口配置
        |   |-- thirdLogin.js // 微信登录方法
        |   |-- utils.js // 公共方法
        |-- custom-tab-bar // 空的自定义tabbar，使用components代替
        |   |-- index.wpy
        |-- filters // wxs filter
        |   |-- index.wxs
        |-- i18n // 主包国际化文件
        |   |-- en.js
        |   |-- en.wxs
        |   |-- index.js
        |   |-- index.wxs
        |   |-- zh_CN.js
        |   |-- zh_CN.wxs
        |-- mixins
        |   |-- initPage.js
        |-- pages // 主包页面文件
        |   |-- home.wpy
        |-- statics // 静态资源文件，如无需编译的js和没有被打包的图片
        |   |-- images
        |       |-- 
        |   |-- js
        |       |-- 
        |-- store // vuex
        |   |-- index.js
            
