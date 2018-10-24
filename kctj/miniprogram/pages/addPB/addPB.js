// miniprogram/pages/addPB/addPB.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isChecked: false
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
      db.collection('pb').add({
        data: {
          pbms: e.detail.value.pbms,
          count: 0
        },
        success: res => {

          wx.showToast({
            title: '新增牌别成功',
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

    this.setData({ isChecked: false })
    
  },

  formReset: function () {
    console.log('form发生了reset事件')
  }
})