import wepy from '@wepy/core'
import apiActions from '@/config/api.js'
import { mapState, mapActions } from '@wepy/x'
export default {
  data: {
    dialogLogin: {
      visible: false,
      url: ''
    }
  },
  computed: {
    ...mapState({
      language: state => state.i18n.language,
      accessToken: state => state.user.accessToken,
      openId: state => state.user.openId,
      formIdList: state => state.formIdList
    })
  },
  methods: {
    ...mapActions({
      updateAccessToken: 'updateAccessToken',
      updateUserInfo: 'updateUserInfo',
      setCurrentPageInfo: 'setCurrentPageInfo',
      spliceFormId: 'spliceFormId'
    }),
    async handleOpenDialogLogin (e) {
      const { url } = e.$wx.currentTarget.dataset
      console.log('handleOpenDialogLogin initPage', e, url)
      if (!this.accessToken) {
        this.dialogLogin.url = url
        this.dialogLogin.visible = true
      } else {
        try {
          await wepy.wx.redirectTo({ url })
          // console.log('redirectTo', url)
        } catch (error) {
          await wepy.wx.switchTab({ url })
          // console.log('switchTab', url)
        }
      }
    },
    handleCloseDialogLogin (e) {
      console.log('handleCloseDialogLogin', e)
      this.dialogLogin.visible = false
    },
    async handleLogined (e) {
      console.log('handleLogined')
      this.dialogLogin.visible = false
      const { url } = e.$wx.currentTarget.dataset
      try {
        await wepy.wx.redirectTo({ url })
        // console.log('redirectTo', url)
      } catch (error) {
        await wepy.wx.switchTab({ url })
        // console.log('switchTab', url)
      }
    },
    autoLogin () {
      return new Promise(async (resolve, reject) => {
        try {
          const { code } = await wepy.wx.login()
          const { token: accessToken = '' } = await apiActions.login.wxLogin({ params: { code } }) || {}
          this.updateAccessToken(accessToken)
          resolve(accessToken)
        } catch (error) {
          // this.updateAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6IkRhIiwiZXhwIjoxNTY5Mjk1OTM1LCJlbWFpbCI6IiJ9.GCUpVQOXtfxGSOpfiq7Gmc4PiT2Me-i2fakZHPgtXj8')
          this.updateAccessToken('')
          resolve('')
        }
      })
    },
    async userRegister (e) {
      return new Promise(async (resolve, reject) => {
        try {
          const { code } = await wepy.wx.login()
          const { userInfo = {}, encryptedData = '', iv = '' } = await wepy.wx.getUserInfo({ withCredentials: true })
          const { token: accessToken = '' } = await apiActions.login.wxRegister({ params: { code, encrypted_data: encryptedData, iv } }) || ''
          console.log('handleRegister', userInfo, accessToken)
          this.updateAccessToken(accessToken)
          resolve(accessToken)
        } catch (error) {
          reject(error)
        }
      })
    },
    getUserInfo () {
      console.log('getUserInfo')
      return new Promise(async (resolve, reject) => {
        try {
          const { info: { avatar_url: avatar = '', id = 0, mobile: phone = '', nick_name: nickName = '', open_id: openId = '', union_id: unionId = '', username: userName = '' } = {} } = await apiActions.user.getUserInfo() || {}
          const userInfo = {
            openId,
            unionId,
            id,
            nickName,
            avatar,
            phone,
            userName
          }
          console.log(userInfo)
          this.updateUserInfo(userInfo)
          resolve(userInfo)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
    }
  },
  onShareAppMessage ({ from = '', target = {}, webViewUrl = '' } = {}) {
    console.log('onShareAppMessage', from, target, webViewUrl)
    const { shareInfo: { title = '今日饮咗未？', path = '/pages/home', imageUrl = '/statics/images/logo.jpg' } = {} } = target.dataset || {}
    // if (targetInfo) {
    // shareInfo = Object.assign({}, ...Object.keys(shareInfo).map(key => Object.assign({ [key]: targetInfo[key] })))
    // }
    return { title, path, imageUrl }
  },
  // async onLoad () {
  //   console.log('accessToken', this.accessToken)
  //   !this.accessToken && await this.autoLogin() // 尝试自动登录，不强制要有登录态
  //   this.accessToken && !this.openId && await this.getUserInfo()
  // },
  async onShow () {
    const { route, options } = this.$wx
    console.log(route, options)
    this.setCurrentPageInfo({ route, options })
    // console.log('initPage onLoad')
    // await this.aaa()
    // console.log('initPage after setTimeout')
  }
}
