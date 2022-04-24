// pages/customer/mine/mine_index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tabCurrentIndex: 2,
    tabBar:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    app.loginPromise.then(function(resolve){
      console.log(resolve)
      that.setData({tabBar: app.globalData.userTabBar})
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
  }
})