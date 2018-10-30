// miniprogram/pages/pbgl/pbgl.js
const app = getApp()
var util = require('../../utils/utils.js')
const db = wx.cloud.database()
Page({

  data: {
    openid: '',
    pb: [],
    workSiteStock:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
      this.setData({
        openid: app.globalData.openid
      })
      // console.log('++++++++++++++++'+this.data.openid)
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

    db.collection('workSiteStock').get({
      success: res => {
        this.setData({
          workSiteStock: res.data[0].workSiteStock
        })
        // console.log(res.data)
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

    if (this.data.openid !='onU7E5PNRNsp0CjmFqpw8kXyk2Sk'){
      return
    }
    
    var pbid = e.currentTarget.dataset.id;
    var pbms = e.currentTarget.dataset.pbms;

    console.log("点击了"+pbms)

    wx.showModal({
      title: '删除牌别',
      content: '确定要删除'+pbms+'?',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: 'red',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: 'red',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          // db.collection('pb').doc(pbid).remove({
          //   success: function (res) {
          //   }
          // })

          wx.cloud.callFunction({
            name: 'removePb',
            data: {
              pbid: pbid,
            }
          }).then((res) => {
            wx.navigateTo({
              url: '../pbgl/pbgl',
            })
            
          }).catch((e) => {
            console.log(e);
          })

          var inDoc = []
          var userName = app.globalData.userInfo.nickName
          var avatarUrl = app.globalData.userInfo.avatarUrl
          var time = util.formatTime(new Date())


          db.collection('doc').add({
            data: {
              detail: inDoc,
              inOrOut: '删除牌别',
              operator: userName,
              operatorImageUrl: avatarUrl,
              operateTime: time,
              remarks: '删除牌别：' + pbms
            },
            success: res => {
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

      },

      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) {
       },//接口调用结束的回调函数（调用成功、失败都会执行）
    })

  
  }
  
})