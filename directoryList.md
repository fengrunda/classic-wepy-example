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
        |   |-- crossNav.js // 跳转其他小程序页面配置
        |   |-- eventHub.js // 事件中心
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
        |   |-- test.js
        |-- pages // 主包页面文件
        |   |-- demo.wpy
        |   |-- home.1.wpy
        |   |-- home.wpy
        |   |-- user.wpy
        |   |-- webview.wpy
        |-- statics // 静态资源文件
        |   |-- images
        |       |-- 
        |   |-- js
        |       |-- 
        |-- store // vuex
        |   |-- index.js
        |-- subPackages // 分包目录
            |-- payment // 分包页面文件
            |   |-- communityList.wpy
            |   |-- masterVerify.wpy
            |   |-- orderList.wpy
            |   |-- paymentBillList.wpy
            |   |-- paymentConfirm.wpy
            |   |-- paymentOrderDetail.wpy
            |   |-- prepayConfirm.wpy
            |   |-- prepayOrderDetail.wpy
            |   |-- roomBind.wpy
            |   |-- roomList.wpy
            |   |-- components // 分包的组件
            |   |   |-- communityItem.wpy
            |   |   |-- paymentBillItem.wpy
            |   |   |-- roomItem.wpy
            |   |   |-- tabBar.wpy
            |   |-- i18n // 分包的国际化文件
            |       |-- en.js
            |       |-- en.wxs
            |       |-- index.js
            |       |-- index.wxs
            |       |-- zh_CN.js
            |       |-- zh_CN.wxs
            
