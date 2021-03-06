// pages/customer/question/question_submit.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tabCurrentIndex: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    app.loginPromise.then(function(resolve){
      console.log(resolve)
      that.setData({tabBar: app.globalData.userTabBar})
      var url = app.globalData.requestPrefix + 'syncsns/getsyncsns'
      wx.request({
        url: url,
        success: (res)=>{
          console.log('Questions:', res)
          var questionList = []
          for(var i = 0; i < 10; i++){
            questionList[i] = res.data[i].syncsns_content
          }
          that.setData({questionList: questionList})
        }
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  tabSwitch: function(e){
    console.log('TabSwitch:', e)
    var url = e.detail.item.pagePath
    wx.redirectTo({
      url: url
    })
  },
  gotoMine:function(){
    wx.redirectTo({
      url: '../mine/mine_index',
    })
  }
})