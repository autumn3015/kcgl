//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    lastestDoc:'',
    hello:'你好，请点击左侧头像登录'
    
  },

  onLoad: function() {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo =res.userInfo
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

    const db = wx.cloud.database()
    db.collection('doc').orderBy('operateTime', 'desc').get({
      success: res => {
        this.setData({
          lastestDoc: res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ')
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true, 
        hello:'你好，'+e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
})
