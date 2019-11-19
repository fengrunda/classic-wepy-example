import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)

let wxConfig = {}
// eslint-disable-next-line no-undef
try { wxConfig = __wxConfig || {} } catch (error) { }
console.log('wxConfig', wxConfig)
const envVersion = wxConfig.envVersion || 'release' // develop 工具或者真机 开发环境; trial 测试环境(体验版); release 正式环境
console.log('process.env.APP_BUILD_TYPE', process.env.APP_BUILD_TYPE, 'envVersion', envVersion, process.env.APP_BUILD_TYPE !== 'auto' ? process.env.APP_BUILD_TYPE : (envVersion === 'release' ? 'production' : 'test'))
const store = new Vuex.Store({
  state: {
    buildType: process.env.APP_BUILD_TYPE !== 'auto' ? process.env.APP_BUILD_TYPE : (envVersion === 'release' ? 'production' : 'test'), // 构建模式 auto test production
    system: wx.getSystemInfoSync() || {}, // https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html
    user: {
      // accessToken: wx.getStorageSync('accessToken') || '',
      accessToken: '',
      openId: '',
      unionId: '',
      id: 0,
      nickName: '',
      avatar: '',
      phone: '',
      userName: ''
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
    updateUserInfo ({ commit, dispatch, state }, userInfo) {
      commit('UPDATE_USER_INFO', userInfo)
    },
    // updateOpenId ({ commit, dispatch, state }, openId) {
    //   commit('UPDATE_USER_OPEN_ID', openId)
    // },
    // updateUnionId ({ commit, dispatch, state }, unionId) {
    //   commit('UPDATE_USER_UNION_ID', unionId)
    // },

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
      // wx.setStorageSync('accessToken', accessToken)
    },
    
    // i18n
    UPDATE_I18N_LANGUAGE (state, language = 'zh') {
      state.i18n.language = language
      // wx.setStorageSync('language', language)
    },
    UPDATE_USER_INFO (state, userInfo = {}) {
      const info = Object.assign({}, ...Object.keys(state.user).map(key => Object.assign({ [key]: userInfo[key] || state.user[key] })))
      console.log(info)
      state.user = info
      // wx.setStorageSync('accessToken', accessToken)
    },
    // UPDATE_USER_OPEN_ID (state, openId) {
    //   // console.log('UPDATE_USER_OPEN_ID', openId)
    //   state.user.openId = openId
    //   // wx.setStorageSync('openId', openId)
    // },
    // UPDATE_USER_UNION_ID (state, unionId) {
    //   // console.log('UPDATE_USER_UNION_ID', unionId)
    //   state.user.unionId = unionId
    //   // wx.setStorageSync('unionId', unionId)
    // },

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
