// import wepy from '@wepy/core'
import { mapState, mapActions } from '@wepy/x'
import { redirectToLogin } from '@/config/utils.js'
import { autoLogin, checkAndUpdateSession } from '@/config/thirdLogin.js'
export default {
  computed: {
    ...mapState({
      openId: state => state.user.openId
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
            redirectToLogin(this.$wx.route, this.$wx.options)
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
