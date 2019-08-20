export default {
  // 车场小程序
  carpark: {
    appId: process.env.APP_BUILD_TYPE === 'test' ? 'wx526bedd57fb36f60' : 'wx7fa29a5373744182',
    paths: {
      home: '',
      visit: 'pages/applyVisit/applyVisit',
      myVisit: '/pages/myVisit/myVisit',
      carpark: 'pages/searchPage/searchPage',
      charge: 'pages/webviewPage/webviewPage?id=2',
      RKE: 'pages/openDoor/openDoor',
      face: 'pages/webviewPage/webviewPage?id=1',
      orderList: 'pages/myOrderList/myOrderList',
      coupon: 'pages/couponInput/couponInput',
      invoice: 'pages/myInvoiceList/myInvoiceList',
      chrageList: 'pages/webviewPage/webviewPage?id=5',
      recordDevice: 'pages/webviewPage/webviewPage?id=6&webviewId=6'
    }
  },
  // 生活小程序
  store: {
    appId: process.env.APP_BUILD_TYPE === 'test' ? 'wx2462b20f888a00d2' : 'wxb268137c0427dde2',
    paths: {
      home: ''
    }
  }
}
