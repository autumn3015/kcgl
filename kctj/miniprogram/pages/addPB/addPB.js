// miniprogram/pages/addPB/addPB.js

const app = getApp()
var util = require('../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isChecked: false,
    workSiteStock: ''
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

    db.collection('workSiteStock').doc('W9HIgFw3CBlYq2jM').get({
      success: res => {
        this.setData({
          workSiteStock: res.data.workSiteStock
        })

      },
      fail: err => {
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value.pbms+e.detail.value.yes)
    if(e.detail.value.yes){
      const db = wx.cloud.database()

      if(!e.detail.value.pbms==''){
        db.collection('pb').add({
          data: {
            pbms: e.detail.value.pbms,
            count: 0
          },
          success: res => {

            wx.showToast({
              title: '已添加牌别',
            })

            formReset()

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
      }
      
      var inDoc = []
      var userName = app.globalData.userInfo.nickName
      var avatarUrl = app.globalData.userInfo.avatarUrl
      var time = util.formatTime(new Date())
      var pbms = e.detail.value['pbms']
      var workSiteStock = e.detail.value['workSiteStock']

      if(!pbms==''){
        db.collection('doc').add({
          data: {
            detail: inDoc,
            inOrOut: '新增牌别',
            operator: userName,
            operatorImageUrl: avatarUrl,
            operateTime: time,
            remarks: '新增牌别：'+pbms
          },
          success: res => {
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

      if (workSiteStock == '') {
        workSiteStock='无'
      }
        db.collection('doc').add({
          data: {
            detail: inDoc,
            inOrOut: '现场',
            operator: userName,
            operatorImageUrl: avatarUrl,
            operateTime: time,
            remarks: '现场库存：' + workSiteStock
          },
          success: res => {
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })

        wx.cloud.callFunction({
          name: 'updateWorksiteStock',
          data: {
            workSiteStock: workSiteStock
          }
        }).then((res) => {
          wx.showToast({
            title: '已更新现场库存',
          })

        }).catch((e) => {
          console.log(e);
        })

      }
   

    this.setData({ isChecked: false })
    
  },

  formReset: function () {
    // console.log('form发生了reset事件')
  }
})