import wepy from '@wepy/core'
import store from '@/store'
// import { redirectToLogin } from '@/config/utils.js'
// 域名列表
const hostList = store.state.buildType === 'test' ? ['https://weixin.test.rfmember.net/zizai'] : ['https://weixin.thinkinpower.com/zizai']
// const hostList = ['https://weixin.test.rfmember.net/zizai']
// 接口列表
const api = {
  /* base */
  base: {
    uploadImg: { // 上传图片
      url: '/api/community/uploadImg',
      method: 'POST'
    },
    uploadBase64Img: { // 上传图片base64
      url: '/api/community/uploadBase64Img',
      method: 'POST'
    },
    getCommunityByService: { // 根据服务获取服务社区列表
      url: '/api/community/getCommunityByService',
      method: 'POST'
    }
  },
  /* home */
  /* user */
  user: {
    getMyUserInfo: { // 获得我的用户信息
      url: '/api/community/user/getMyUserInfo',
      method: 'POST'
    },
    getDefaultCommunity: { // 获取用户默认社区
      url: '/api/community/user/userDefaultCommunity',
      method: 'POST'
    }
  },
  /* login */
  login: {
    registUserFromCode: { // 获取用户code换成第三方登录用户信息（小程序专用）
      url: '/api/community/thirdact/registUserFromCode',
      method: 'POST'
    },
    openlogin: { // 开放登录接口，使用OpenId
      url: '/api/community/thirdact/openloginSession',
      method: 'POST'
    },
    getSessionFromCode: { // 获取用户code换成第三方登录token
      url: '/api/community/thirdact/getTokenFromCode',
      method: 'POST'
    },
    sendSms: { // 发送验证码
      url: '/api/community/account/sendQuickLoginSmsWithCheck',
      method: 'POST'
    },
    loginCaptcha: { // 验证码登录
      url: '/api/community/account/quickLogin',
      method: 'POST'
    },
    loginPassword: { // 密码登录
      url: '/api/community/account/login',
      method: 'POST'
    },
    getPhoneNumber: { // 解析手机号
      url: '/api/community/thirdact/getPhoneNumber',
      method: 'POST'
    },
    bindThirdAccount: { // 绑定第三方帐号到平台
      url: '/api/community/thirdact/bindThirdAccountSession',
      method: 'POST'
    },
    logout: { // 注销
      url: '/api/community/account/logout',
      method: 'POST'
    },
    editMyInfo: { // 更新用户信息
      url: '/api/community/user/editMyInfo',
      method: 'POST'
    },
    getThirdInfoFromCode: { // 获取用户code换成第三方ID信息
      url: '/api/community/thirdact/codeToId',
      method: 'POST'
    },
    getSappTokenSessionPlatform: { // 获取平台渠道的SappToken，使用thirdSession
      url: '/api/community/thirdact/getChannelSappCodeSession',
      method: 'POST'
    },
    getPhoneAndRegisterPlatform: { // 获取手机号，并注册用户
      url: '/api/community/thirdact/bindChannelByMobile',
      method: 'POST'
    },
    checkThirdSession: { // 检查ThirdSession是否过期
      url: '/api/community/thirdact/checkThirdSession',
      method: 'POST'
    }
  },
  /* payment */
  payment: {
    getPropAddrCertRoomList: { // 物业缴费绑定-获取用户认证的地址列表
      url: '/api/community/getPropAddrCertRoomList',
      method: 'POST'
    },
    getRoomInfoById: { // 根据房产ID获取房产信息
      url: '/api/community/master/getMasterInfoById',
      method: 'POST'
    },
    getPaymentSystemCommunityList: { // 获取缴费系统社区列表
      url: '/api/community/payment/getZiZaiCommunityList',
      method: 'POST'
    },
    getHousesType: { // 物业缴费绑定-房间类型列表
      url: '/api/community/getHousesType',
      method: 'POST'
    },
    getHousesList: { // 物业缴费绑定-获取物业缴费的房间列表
      url: '/api/community/getHousesList',
      method: 'POST'
    },
    getHousesByIds: { // 物业缴费绑定-获取物业缴费的房间列表
      url: '/api/community/getHousesByIds',
      method: 'POST'
    },
    getOwnerInfo: { // 物业缴费绑定-获取业户部分名字和电话
      url: '/api/community/getOwnerNameAndPhone',
      method: 'POST'
    },
    verifyOwnerInfo: { // 物业缴费绑定-业户名字和电话验证
      url: '/api/community/verifyOwnerNameAndPhone',
      method: 'POST'
    },
    bindRoomAddr: { // 绑定缴费地址
      url: '/api/community/bindPropAddrRoom',
      method: 'POST'
    },
    getProject: { // 预缴费-获取费项列表
      url: '/api/community/payment/getProject',
      method: 'POST'
    },
    getPaymentBillExt: { // 根据房间ID查询账单列表
      url: '/api/community/payment/getPaymentBillExt',
      method: 'POST'
    },
    createJsPaymentOrder: { // 创建缴费订单
      url: '/api/community/payment/createJsPaymentOrder',
      method: 'POST'
    },
    getPaymentOrderlList: { // 查询订单列表
      url: '/api/community/payment/getPaymentOrderList',
      method: 'POST'
    },
    cancelPaymentOrder: { // 取消订单
      url: '/api/community/payment/cancelPaymentOrder',
      method: 'POST'
    },
    getPaymentHistoryOrderList: { // 查询缴费历史列表
      url: '/api/community/payment/getPaymentOrderHisListZiZai',
      method: 'POST'
    },
    getPrepayHistoryOrderList: { // 查询预缴费历史列表
      url: '/api/community/payment/getPrePaymentOrderHisListZiZai',
      method: 'POST'
    },
    getPrepayProjectList: { // 预缴费-获取费项列表
      url: '/api/community/payment/getProject',
      method: 'POST'
    },
    getPrepayProjectInfo: {  // 预缴费-获取指定费项余额，可预缴日期， 发票抬头
      url: '/api/community/payment/getPrePaymentProjectInfo',
      method: 'POST'
    },
    createJsPrePaymentOrder: {  // 预缴费接口
      url: '/api/community/payment/createJsPrePaymentOrder',
      method: 'POST'
    },
    getPrepayOrderlList: {  // 查询预缴费订单列表
      url: '/api/community/payment/getPrePaymentOrderList',
      method: 'POST'
    },
    cancelPrepayOrder: { // 取消预缴费订单
      url: '/api/community/payment/cancelPrePaymentOrder',
      method: 'POST'
    },
    checkPaymentBills: { // 判断账单是否变化（创建订单时判断，支付时判断）
      url: '/api/community/payment/isPaymentBillsChanged',
      method: 'POST'
    },
    invalidatePaymentOrder: { // 失效待支付订单
      url: '/api/community/payment/invalidatePaymentOrder',
      method: 'POST'
    },
    invalidatePrePaymentOrder: { // 失效待支付订单
      url: '/api/community/payment/invalidatePrePaymentOrder',
      method: 'POST'
    }
  },
  // repair
  repair: {
    getServiceInfoByCommunityIds: { // 根据服务获取服务社区列表
      url: '/api/community/service/communityServiceByIds',
      method: 'POST'
    },
    getProblemList: { // 获取问题类型
      url: '/api/community/repair/problem_types',
      method: 'POST'
    },
    getServiceCategoryList: { // 获取服务类别
      url: '/api/community/repair/service_categories',
      method: 'POST'
    },
    getUrgencyLevelList: { // 获取紧急程度
      url: '/api/community/repair/urgency_levels',
      method: 'POST'
    },
    getPreFeeDetail: { // 获取预估报价
      url: '/api/community/repair/getPreFeeDetail',
      method: 'POST'
    },
    createJsRepairRecord: { // 创建工单
      url: '/api/community/repair/createJsRepairRecord',
      method: 'POST'
    },
    getEstimateCostList: { // 获取预估维修物料报价表
      url: '/api/community/repair/getPreFeeDetail',
      method: 'POST'
    },
    getOrderList: { // 获取我的工单列表
      url: '/api/community/repair/my',
      method: 'POST'
    },
    getOrderEvaluation: { // 获取工单评价
      url: '/api/community/repair/remarks',
      method: 'POST'
    },
    orderRemimd: { // 用户催单接口, 每天只能催一次单
      url: '/api/community/repair/remimd',
      method: 'POST'
    },
    orderEvaluate: { // 用户催单接口, 每天只能催一次单
      url: '/api/community/repair/evaluate',
      method: 'POST'
    },
    getOrderDetail: { // 获取意见报修单详情
      url: '/api/community/repair/detail',
      method: 'POST'
    },
    getOrderProgress: { // 获取意见报修单进度
      url: '/api/community/repair/progress',
      method: 'POST'
    },
    orderCancel: { // 取消工单
      url: '/api/community/repair/cancelWorkOrder',
      method: 'POST'
    },
    createJsRepairOrder: { // 创建有偿维修支付订单（适用于H5）
      url: '/api/community/repair/createJsRepairOrder',
      method: 'POST'
    },
    payJsRepairOrder: { // 支付有偿维修订单（适用于H5）
      url: '/api/community/repair/payJsRepairOrder',
      method: 'POST'
    }
  },
  // carpark
  carpark: {
    getGuardDeviceList: { // 获取设备列表
      url: '/api/community/guarddevice/list',
      method: 'POST'
    },
    checkFacePermission: { // 查询当前用户所在认证社区是否有人脸设备
      url: '/api/community/face/hasFacePerm',
      method: 'POST'
    }
  },
  // invoice
  invoice: {
    getPaymentInvoiceTax: { // 获取物业发票列表
      url: '/api/community/payment/getPaymentInvoiceTax',
      method: 'POST'
    },
    getCarparkInvoiceTax: { // 获取停车发票列表
      url: '/api/community/parking/tax/getPersonTaxRecordList',
      method: 'POST'
    }
  }
}
// 制作api action
const apiActions = {}
Object.keys(api).map(moduleName => {
  const apiModule = {}
  Object.keys(api[moduleName]).map(key => {
    const action = {
      [key]: ({ hostType = 0, params, ...options } = {}) => {
        return new Promise(async (resolve, reject) => {
          const requestParams = Object.assign({
            url: hostList[hostType] + api[moduleName][key].url,
            data: params,
            method: api[moduleName][key].method || 'POST',
            header: {}
          }, options)
          requestParams.header = Object.assign({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;charset=utf-8',
            'ApiEnv': store.state.buildType === 'prerelease' ? 'testextra' : '',
            'Accept-Language': store.state.system.language
          }, (api[moduleName][key].header || {}), (options.header || {}))
          try {
            const { statusCode = 0, data = {} } = await wepy.wx.request(requestParams) || {}
            // console.log(statusCode, data, header)
            if (statusCode === 200) {
              if (data.status === 200) {
                resolve(data)
                return
              } else if (data.status === 403 || data.status === 402) {
                // console.log('toLogin', store.state.page)
                // redirectToLogin(store.state.page.route, store.state.page.options)
              }
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
// console.log('apiActions', apiActions)
export default apiActions
