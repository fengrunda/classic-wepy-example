import wepy from 'wepy'
// 域名列表
const hostList = wepy.$appConfig.buildType === 'test' ? ['https://weixin.test.rfmember.net/zizai'] : ['https://weixin.thinkinpower.com/zizai']
// 接口列表
const api = {
  getUserInfo: { // 获取用户信息
    url: '/api/community/getMyUserInfoForActivity',
    method: 'POST'
  },
  getWeChatInfo: { // 获取微信配置
    url: '/api/community/weixin/getWXJsConfig',
    method: 'POST'
  },
  getActivityInfo: { // 获取活动信息
    url: '/api/community/getActivityInfo',
    method: 'POST'
  }
}
// 制作api action
const apiActions = {}
Object.keys(api).map(key => {
  const action = {
    [key]: ({ hostType = 0, params, ...options } = {}) => {
      return new Promise(async (resolve, reject) => {
        try {
          const requestParams = {
            url: hostList[hostType] + api[key].url,
            data: params,
            method: api[key].method,
            header: { 'Content-type': 'application/x-www-form-urlencoded' }
          }
          // console.log('requestOptions:', Object.assign(requestParams, options))
          const { statusCode, data } = await wepy.request(Object.assign(requestParams, options))
          // console.log(statusCode, data, header)
          if (statusCode === 200) {
            if (data.status === 200) {
              resolve(data)
            } else if (data.status === 403 || data.status === 404) {
              console.log('toLogin')
              // TODO toLogin
            }
          }
          reject(data)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
    }
  }
  Object.assign(apiActions, action)
})
export default apiActions
