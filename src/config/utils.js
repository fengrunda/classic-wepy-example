import wepy from 'wepy'
/**
 * 错误信息字符化
 * @param {*} error 错误对象
 * @param {String} methodName 方法名称
 */
const errorFormatter = (error, methodName) => {
  // let msg = error instanceof Error ? error.toString() : error.message || JSON.stringify(error)
  let msg = error.message || JSON.stringify(error)
  // 开发测试环境显示错误方法名
  if (methodName && wepy.$appConfig.buildType !== 'production') {
    msg = methodName + ':' + msg
  }
  return msg
}
export {
  errorFormatter
}
