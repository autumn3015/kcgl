// miniprogram/pages/docDetai/docDetail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    operateTime:'',
    operator:'',
    remarks:'',
    avatarUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var doc = wx.getStorageSync('doc')
    
    this.setData({
      detail: doc.detail,
      operateTime:doc.operateTime,
      operator:doc.operator,
      remarks:doc.remarks,
      avatarUrl: app.globalData.userInfo.avatarUrl
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

  }
})