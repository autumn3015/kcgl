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
    
    db.collection('pb').get({
      success: res => {
        this.setData({
          pb: res.data
        })
        console.log('[数据库] [查询记录] 成功: ' + res.data, res)
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

    var inDoc=[]
    var userName = app.globalData.userInfo.nickName
    var time = util.formatTime(new Date())
    const db = wx.cloud.database()

    if(e.detail.value.yes){
      for (var i = 0; i < this.data.pb.length; i++) {

        if (e.detail.value["count" + i] > 0) {
          inDoc.push({ "pb": this.data.pb[i].pbms, "count": e.detail.value["count" + i] })
          db.collection('pb').doc(this.data.pb[i]._id).update({
            data: {
              count: parseInt(this.data.pb[i].count) + parseInt(e.detail.value["count" + i])
            },
            fail: err => {
              icon: 'none',
              console.error('[数据库] [更新记录] 失败：', err)
            }
          })
        }
      }
      
      db.collection('doc').add({
        data: {
          detail: inDoc,
          operator: userName,
          operateTime: time,
          inOrOut:'in',
          remarks:'无'
        },
        success: res => {
          // // 在返回结果中会包含新创建的记录的 _id
          // this.setData({
          //   counterId: res._id,
           
          // })
          wx.showToast({
            title: '已经提交',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }

    this.setData({isChecked:false})

  },

  formReset: function () {
    console.log('form发生了reset事件')
  }
  })