// miniprogram/pages/codeValidate/codeValidate.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  validateBox: function (e) {
    var code = e.detail.value.code
    var openid = app.globalData.openid
   
   if(code=='xy123'){
     
     db.collection('openids').add({
       data: {
         openid: openid,
       },
       success: res => {
         wx.showToast({
           title: '验证通过',
         })

         // console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
       },
       fail: err => {
         console.error('[数据库] [新增记录] 失败：', err)
       }
     },
     
       wx.navigateTo({
         url: "../index/index"
       }))
   }else{
     wx.showToast({
       title: '验证失败'
     })
   }
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