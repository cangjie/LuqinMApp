// pages/customer/poster/landing.js
const app = getApp()
import util from '../../../utils/util.js'
Page({

  /**
   * Page initial data
   */
  data: {
    q: '',
    scan: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    console.log(util.formatTime(new Date()))
    if (options.q!=null){
      var q = decodeURIComponent(options.q)
    }
    //that.setData({q: options.q, scan: options.scancode_time})
    app.loginPromise.then(function(resolve){
      
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

  }
})