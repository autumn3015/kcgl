//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    avatarUrl: 'data:image/png;base64,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',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    latestDoc: '',
    hello: '请点击左侧图标登录'

  },

  onLoad: function () {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        var openid = res.result.openid
        console.log('取得了openid'+openid)

        db.collection('openids').where({
          openid: openid
        }).get({
          success: function (res) {
            if(res.data.length<1){
                wx.navigateTo({
            url: "../codeValidate/codeValidate"
          })
            }

          },
          fail: console.error
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

          wx.getUserInfo({
            success: res => {

              app.globalData.userInfo = res.userInfo
              console.log('////////////////////////////////////'+app.globalData.openid)
              this.setData({
                hello: '你好，' + res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              })
            }
          })
        }
      }
    })
  },

  onShow: function () {

    console.log("yanzhenglema" + app.globalData.validated)

    if (!app.globalData.validated) {
      wx.navigateTo({
        url: "../codeValidate/codeValidate"
      })
    }
    
  },

  onGetUserInfo: function (e) {

    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        hello: '你好，' + e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
})
