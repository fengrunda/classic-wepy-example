import wepy from '@wepy/core'
import store from '@/store'
/**
 * 错误信息字符化
 * @param {*} error 错误对象
 * @param {String} methodName 方法名称
 */
const errorFormatter = (error, methodName = '') => {
  // console.log(error.message, error instanceof Error, error.toString(), JSON.stringify(error))
  let msg = error.message || (error instanceof Error ? error.toString() : JSON.stringify(error))
  // 开发测试环境显示错误方法名
  // console.log('errorFormatter', store.state.buildType)
  if (store.state.buildType !== 'production') {
    msg = methodName + ':' + msg + (error.status ? `(${error.status})` : '')
  }
  return msg
}
/**
 * 判断是否需要跳转去登录页
 * @param {*} error 错误对象
 * @param {*} route 前页面路径
 * @param {*} query 页面参数
 * @param {*} toBind 是否跳转到绑定页
 */
const redirectToLogin = async (route, query, toBind = false) => {
  try {
    const baseUrl = '/subPackages/login/login'
    const paramsArr = Object.keys(query).map(key => `${key}=${query[key]}`)
    const redirectUrl = `${route}?${paramsArr.join('&')}`
    const url = `${baseUrl}?redirectUrl=${encodeURIComponent(redirectUrl)}&loginType=${toBind ? 'bind' : ''}`
    // console.log('needToLogin url', url)
    await wepy.wx.redirectTo({ url })
  } catch (error) {
    console.error('redirectToLogin', store.state, error)
  }
}
/**
 * 带参跳转
 * @param {Object} params {url,params,isRedirect}
 */
const navigateWithParams = async ({ url = '', params = {}, isRedirect = false } = {}) => {
  const paramsArr = Object.keys(params).map(key => `${key}=${params[key]}`)
  const navigatorUrl = `${url}?${paramsArr.join('&')}`
  try {
    if (isRedirect) {
      await wepy.wx.redirectTo({ url: navigatorUrl })
    } else {
      await wepy.wx.navigateTo({ url: navigatorUrl })
    }
  } catch (error) {
    console.error('navigateWithParams', store.state, error)
  }
}

/**
   * 格式化地址
   */
const formatAddress = ({ communityName = '', build = '', floor = '', room = '' } = {}) => {
  let address = communityName
  if (build && build.length > 0 && build.indexOf('NA') !== 0) {
    const lastChar = build.substr(build.length - 1)
    if (lastChar !== '栋') {
      build += '栋'
    }
    address += `-${build}`
  }
  if (floor && floor.length > 0 && floor.indexOf('NA') !== 0) {
    const lastChar = floor.substr(floor.length - 1)
    if (lastChar !== '层') {
      floor += '层'
    }
    address += `-${floor}`
  }
  if (room && room.length > 0 && room.indexOf('NA') !== 0) {
    const lastChar = room.substr(room.length - 1)
    if (lastChar !== '号') {
      room += '号'
    }
    address += `-${room}`
  }
  return address
}
class UrlClass {
  constructor (url) {
    // const url = 'http://www.baidu.com/path1/path2?search1=1&search2=2#/hash1/hash2?query1=a&query2=b'
    const names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'search', 'hash']
    const regexUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    this.result = regexUrl.exec(url).map((value, index) => {
      let missingStr = ''
      let valueStr = ''
      if (typeof (value) !== 'undefined') {
        switch (names[index]) {
          case 'hash': missingStr = '#'; break
          case 'port': missingStr = ':'; break
          case 'path': missingStr = '/'; break
          case 'search': missingStr = '?'; break
          case 'slash': missingStr = ':'; break
        }
        valueStr = missingStr + value
      }
      return valueStr
    }) || new Array(8)
  }
  get href () {
    return this.result.filter((value, index) => index > 0).join('')
  }
  get scheme () {
    return this.result[1]
  }
  set scheme (value) {
    this.result[1] = value
  }
  get slash () {
    return this.result[2]
  }
  set slash (value) {
    this.result[2] = value
  }
  get host () {
    return this.result[3]
  }
  set host (value) {
    this.result[3] = value
  }
  get port () {
    return this.result[4]
  }
  set port (value) {
    this.result[4] = value
  }
  get path () {
    return this.result[5]
  }
  set path (value) {
    this.result[5] = value
  }
  get search () {
    return this.result[6]
  }
  set search (value) {
    this.result[6] = value
  }
  get hash () {
    return this.result[7]
  }
  set hash (value) {
    this.result[7] = value
  }
}
export {
  errorFormatter,
  redirectToLogin,
  navigateWithParams,
  formatAddress,
  UrlClass
}
