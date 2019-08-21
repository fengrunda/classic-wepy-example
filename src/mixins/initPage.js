// import wepy from '@wepy/core'
import { mapState, mapActions } from '@wepy/x'
import { redirectToLogin } from '@/config/utils.js'
import { autoLogin, checkAndUpdateSession } from '@/config/thirdLogin.js'
export default {
  computed: {
    ...mapState({
      language: state => state.i18n.language,
      accessToken: state => state.user.accessToken,
      thirdSession: state => state.user.thirdSession,
      enableAutoLogin: state => state.user.enableAutoLogin
    })
  },
  methods: {
    ...mapActions({
      updateAccessToken: 'updateAccessToken',
      updateThirdSession: 'updateThirdSession',
      setCurrentPageInfo: 'setCurrentPageInfo',
      spliceFormId: 'spliceFormId'
    }),
    async checkSession (currentSession) {
      return new Promise(async (resolve, reject) => {
        try {
          const thirdSession = await checkAndUpdateSession(currentSession)
          this.updateThirdSession(thirdSession)
          resolve(thirdSession)
        } catch (error) {
          reject(error)
        }
      })
    },
    autoLogin (requireAccessToken = true) {
      return new Promise(async (resolve, reject) => {
        try {
          const { accessToken, thirdSession } = await autoLogin(this.thirdSession, this.accessToken, this.enableAutoLogin, this.$wx)
          if (!accessToken && requireAccessToken) {
            // TODO 跳转登录页
            // redirectToLogin(this.$wx.route, this.$wx.options)
            reject(new Error('requireAccessToken'))
            return
          } else {
            this.updateThirdSession(thirdSession)
            this.updateAccessToken(accessToken)
          }
          resolve({ accessToken, thirdSession })
        } catch (error) {
          console.error('autoLogin', error)
          reject(error)
        }
      })
    }
  },
  async onShow () {
    const { route, options } = this.$wx
    this.setCurrentPageInfo({ route, options })
    // console.log('initPage onLoad')
    // await this.aaa()
    // console.log('initPage after setTimeout')
  }
}
