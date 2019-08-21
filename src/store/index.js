import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)
const store = new Vuex.Store({
  state: {
    // buildType: 'test', // test prerelease production
    buildType: process.env.APP_BUILD_TYPE, // 构建模式 test prerelease production
    system: wx.getSystemInfoSync() || {}, // https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html
    user: {
      accessToken: wx.getStorageSync('accessToken') || '',
      thirdSession: wx.getStorageSync('thirdSession') || '',
      enableAutoLogin: parseInt(wx.getStorageSync('enableAutoLogin')) >= 0 ? parseInt(wx.getStorageSync('enableAutoLogin')) : 1, // 自动登录开关
      openId: wx.getStorageSync('openId') || '',
      unionId: wx.getStorageSync('unionId') || ''
    },
    i18n: {
      language: wx.getStorageSync('language') || 'zh'
    },
    page: {
      route: '', // 页面路径
      options: {} // 页面参数
    },
    formIdList: [] // 收集的formId列表
  },
  actions: {
    spliceFormId ({ commit, dispatch, state }, { index = -1, deleteCount = 0, formId } = {}) {
      commit('SPLICE_FORM_ID', { index, deleteCount, formId })
    },
    // user
    updateAccessToken ({ commit, dispatch, state }, accessToken) {
      commit('UPDATE_USER_ACCESS_TOKEN', accessToken)
    },
    updateThirdSession ({ commit, dispatch, state }, thirdSession) {
      commit('UPDATE_USER_THIRD_SESSION', thirdSession)
    },
    updateAutoWechatLogin ({ commit, dispatch, state }, enableAutoLogin) {
      commit('UPDATE_USER_ENABLE_AUTO_LOGIN', enableAutoLogin)
    },
    updateOpenId ({ commit, dispatch, state }, openId) {
      commit('UPDATE_USER_OPEN_ID', openId)
    },
    updateUnionId ({ commit, dispatch, state }, unionId) {
      commit('UPDATE_USER_UNION_ID', unionId)
    },

    // i18n
    initialLanguage ({ commit, dispatch, state }, language) {
      console.log('initialLanguage', language)
      commit('UPDATE_I18N_LANGUAGE', language)
      // eventHub.$emit('onLanguageChange', language)
    },

    // page
    setCurrentPageInfo ({ commit, dispatch, state }, { route, options }) {
      // console.log('setCurrentPageInfo', { route, options })
      commit('UPDATE_PAGE_ROUTE', route)
      commit('UPDATE_PAGE_OPTIONS', options)
    }
  },
  mutations: {
    SPLICE_FORM_ID (state, { index = -1, deleteCount = 0, formId = '' }) {
      if (formId) {
        state.formIdList.splice(index, deleteCount, formId)
      } else {
        state.formIdList.splice(index, deleteCount)
      }
      // console.log('SPLICE_FORM_ID', { index, deleteCount, formId }, state.formIdList)
    },
    // user
    UPDATE_USER_ACCESS_TOKEN (state, accessToken = '') {
      state.user.accessToken = accessToken
      wx.setStorageSync('accessToken', accessToken)
    },
    UPDATE_USER_THIRD_SESSION (state, thirdSession = '') {
      state.user.thirdSession = thirdSession
      wx.setStorageSync('thirdSession', thirdSession)
    },
    UPDATE_USER_ENABLE_AUTO_LOGIN (state, enableAutoLogin = 0) {
      state.user.enableAutoLogin = enableAutoLogin
      wx.setStorageSync('enableAutoLogin', enableAutoLogin)
    },
    UPDATE_USER_OPEN_ID (state, openId) {
      // console.log('UPDATE_USER_OPEN_ID', openId)
      state.user.openId = openId
      wx.setStorageSync('openId', openId)
    },
    UPDATE_USER_UNION_ID (state, unionId) {
      // console.log('UPDATE_USER_UNION_ID', unionId)
      state.user.unionId = unionId
      wx.setStorageSync('unionId', unionId)
    },

    // i18n
    UPDATE_I18N_LANGUAGE (state, language = 'zh') {
      state.i18n.language = language
      // wx.setStorageSync('language', language)
    },

    // page
    UPDATE_PAGE_ROUTE (state, route = '') {
      state.page.route = route
    },
    UPDATE_PAGE_OPTIONS (state, options = {}) {
      state.page.options = options
    }
  }
})
export default store
