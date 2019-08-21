export default {
  // 车场小程序
  carpark: {
    appId: process.env.APP_BUILD_TYPE === 'test' ? '' : '',
    paths: {
      home: '',
      visit: 'pages/applyVisit/applyVisit',
      myVisit: '/pages/myVisit/myVisit'
    }
  },
  // 生活小程序
  store: {
    appId: process.env.APP_BUILD_TYPE === 'test' ? '' : '',
    paths: {
      home: ''
    }
  }
}
