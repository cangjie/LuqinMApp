// pages/customer/index/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    sessionKey: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    app.loginPromise.then(function(resolve){
      console.log(resolve)
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
  gotoNext: function(){
    wx.navigateTo({
      url: 'http://mp.weixin.qq.com/s?__biz=MzA3MTM1OTIwNg==&mid=2654310676&idx=1&sn=34b67a6623d889e2a10911b1d7fa8dfc&chksm=84effe9db398778b39d405e005426525d8c42417ecc842b0e2f716c6a710b5a558630fffee29#rd',
    })
  }
})