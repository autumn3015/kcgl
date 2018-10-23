const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    docList: []

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

    db.collection('doc').orderBy('operateTime', 'desc').get({
      success: res => {
        this.setData({
          docList: res.data
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

  click: function (e) {

    var index = e.currentTarget.dataset.id
    var doc = this.data.docList[index];
    wx.setStorageSync('doc', doc);

    console.log(doc)

    wx.navigateTo({
      url: '../docDetail/docDetail'
    })

  }
})