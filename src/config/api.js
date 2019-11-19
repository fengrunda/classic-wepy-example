import wepy from '@wepy/core'
import store from '@/store'
// 域名列表
const hostList = store.state.buildType === 'test' ? ['https://ylapirelease.3pigcn.com'] : ['https://ylapirelease.3pigcn.com'] // TODO 需要根据业务域名修改
// 接口列表
// https://gitee.com/guangzhou_three_pigs/dashboard/issues?id=I11SCX
const api = {
  /* base */
  base: {
    getQrcode: {
      url: '/wx/qrcode/', // 获取小程序码
      method: 'POST'
    },
    getUserPhone: {
      url: '/wx/user/phone/',
      method: 'POST'
    },
    userUpadte: {
      url: '/wx/user/{id}/',
      method: 'PUT'
    },
    wechatPay: {
      url: '/wxpay/',
      method: 'POST'
    },
    uploadBase64: {
      url: '/img_str/',
      method: 'POST'
    }
  },
  /* user */
  user: {
    getUserInfo: { // 获得我的用户信息
      url: '/wx/user/',
      method: 'GET'
    }
  },
  /* login */
  login: {
    wxLogin: { // 登陆微信获取 Token
      url: '/api/wx_login/',
      method: 'POST'
    },
    wxRegister: { // 登陆微信获取 Token
      url: '/api/wx_create/',
      method: 'POST'
    }
  },
  /* questionnaire */
  questionnaire: {
    list: {
      url: '/questionnaire/',
      method: 'GET'
    },
    detail: {
      url: '/questionnaire/{id}/',
      method: 'GET'
    }
  }
}
// 制作api action
const apiActions = {}
Object.keys(api).map(moduleName => {
  const apiModule = {}
  Object.keys(api[moduleName]).map(key => {
    const action = {
      [key]: ({ hostType = 0, params = {}, restfulParams = {}, ...options } = {}) => {
        return new Promise(async (resolve, reject) => {
          const requestParams = Object.assign({
            url: hostList[hostType] + api[moduleName][key].url,
            data: params,
            method: api[moduleName][key].method || 'POST',
            header: {}
          }, options)
          requestParams.header = Object.assign({
            'Authorization': store.state.user.accessToken ? ('JWT ' + store.state.user.accessToken) : '',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;charset=utf-8'
          }, (api[moduleName][key].header || {}), (options.header || {}))
          Object.keys(restfulParams).map(key => {
            requestParams.url = requestParams.url.replace(`{${key}}`, restfulParams[key])
          })
          try {
            const { statusCode = 0, data = {} } = await wepy.wx.request(requestParams) || {}
            // console.log(statusCode, data, header)
            if (statusCode < 400) {
              resolve(data)
              return
            }
            console.error('apiActions', moduleName, key, requestParams, data)
            reject(data)
          } catch (error) {
            console.error('wx.request', requestParams, error)
            reject(error)
          }
        })
      }
    }
    Object.assign(apiModule, action)
  })
  Object.assign(apiActions, { [moduleName]: apiModule })
})
apiActions.hostList = hostList
// console.log('apiActions', apiActions)
export default apiActions
