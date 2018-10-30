const app = getApp()
var util = require('../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pb:[],
    isChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      fail: function (res) {
             wx.showToast({
                title: '请登录'
             })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    const db = wx.cloud.database()
    
    db.collection('pb').orderBy('pbms', 'asc').get({
      success: res => {
        this.setData({
          pb: res.data
        })
        // console.log('[数据库] [查询记录] 成功: ')
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
  
    if (e.detail.value.yes) {

      var inDoc = []
      var userName = app.globalData.userInfo.nickName
      var avatarUrl = app.globalData.userInfo.avatarUrl
      var time = util.formatTime(new Date())
      var remarks = e.detail.value['remarksText']
      const db = wx.cloud.database()

      for (var i = 0; i < this.data.pb.length; i++) {

        if (e.detail.value["count" + i] > 0) {
          inDoc.push({ "pb": this.data.pb[i].pbms, "count": e.detail.value["count" + i] })

          wx.cloud.callFunction({
            name: 'updatePb',
            data: {
              id: this.data.pb[i]._id,
              count: parseInt(this.data.pb[i].count) + parseInt(e.detail.value["count" + i])
            }
          }).then((res) => {

          }).catch((e) => {
            console.log(e);
          })
        }
      }

      if (remarks == '') {
        remarks = '无'
      }


      db.collection('doc').add({
        data: {
          detail: inDoc,
          inOrOut: '入库',
          operator: userName,
          operatorImageUrl: avatarUrl,
          operateTime: time,
          remarks: remarks
        },
        success: res => {
          wx.showToast({
            title: '已经提交',
          })
          
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })

      wx.navigateTo({
        url: "../index/index"
      })
    }

    this.setData({isChecked:false})

  },

  formReset: function () {
    console.log('form发生了reset事件')
  }
  })