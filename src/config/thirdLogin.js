import wepy from '@wepy/core'
import apiActions from './api'
import { redirectToLogin } from '@/config/utils.js'
import store from '@/store'
/**
 * 检查并更新第三方session
 * @param {*} currentSession 当前的微信第三方session
 */
const checkAndUpdateSession = (currentSession = '') => {
  // console.log('checkAndUpdateSession')
  return new Promise(async (resolve, reject) => {
    // step 1 检查session
    let thirdSession = currentSession
    let sessionAvailable = false
    // 是否强制更新
    if (thirdSession) { // 不是强制更新
      try {
        // 检查微信session_key
        await wepy.wx.checkSession()
        // console.log('checkSession', res)
        // 检查thirdSession
        const { data: available = false } = await apiActions.login.checkThirdSession({ params: { thirdSession } }) || {}
        sessionAvailable = available
      } catch (error) {
        // console.error('checkSession', error)
      }
    }
    // 更新session
    if (!sessionAvailable) {
      try {
        // step 2 重新获取code
        const { code } = await wepy.wx.login()
        // console.log('checkAndUpdateSession code', code)
        // step 3 重新获取thirdSession
        const { data: { thirdSession: newSession, openId = '', unionId = '' } = {} } = await apiActions.login.getThirdInfoFromCode({ params: { code, type: 8 } }) || {}
        openId && store.dispatch('updateOpenId', openId)
        unionId && store.dispatch('updateUnionId', unionId)
        // console.log('checkAndUpdateSession newSession', newSession, openId, unionId)
        thirdSession = newSession
      } catch (error) {
        console.error('wx.login getThirdInfoFromCode', error)
        reject(error)
      }
    }
    resolve(thirdSession)
  })
}
/**
 * 获取accessToken
 * @param {*} thirdSession 第三方session
 */
const getAccessToken = (thirdSession) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { authSetting = {} } = await wepy.wx.getSetting() || {}
      // console.log('getAccessToken authSetting', authSetting)
      if (!authSetting['scope.userInfo']) {
        reject(new Error('用户未授权'))
        return
      }
      // 获取用户token
      const { data: { access_token: accessToken, user_flag: userFlag } = {} } = await apiActions.login.openlogin({
        params: {
          accessType: 1,
          thirdSession,
          type: 8,
          platform: 5
        }
      }) || {}
      resolve({ accessToken, userFlag })
    } catch (error) {
      console.error('getAccessToken')
      reject(error)
    }
  })
}
let firstVisit = true
/**
 * 自动登录
 * @param {*} currentSession
 * @param {*} currentToken
 * @param {*} $wx
 */
const autoLogin = (currentSession, currentToken, enableAutoLogin, $wx) => {
  return new Promise(async (resolve, reject) => {
    let accessToken = currentToken
    let thirdSession = currentSession
    if (!firstVisit) { // 非首次则直接返回
      resolve({ thirdSession, accessToken })
      return
    }
    try {
      // 检查或更新thirdSession有效性
      thirdSession = await checkAndUpdateSession(thirdSession) || ''
    } catch (error) {}
    if (!enableAutoLogin) {
      resolve({ thirdSession, accessToken })
      return
    }
    firstVisit = false
    try {
      // 获取用户token
      const { accessToken: accessTokenNew = '' } = await getAccessToken(thirdSession) || {}
      accessToken = accessTokenNew
    } catch (error) {
      if (error.status === 406) { // TODO 用户手机号与微信号未绑定
        // TODO 跳转到绑定页
        // redirectToLogin($wx.route, $wx.options, true)
      }
    }
    resolve({ thirdSession, accessToken })
  })
}
export {
  getAccessToken,
  autoLogin,
  checkAndUpdateSession
}
