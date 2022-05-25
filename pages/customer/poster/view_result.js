// pages/customer/poster/view_result.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this
    app.loginPromise.then((resovle)=>{
      var getDataUrl = app.globalData.requestPrefix + 'Promote/GetPersonalPromoteResult?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      wx.request({
        url: getDataUrl,
        method: 'GET',
        success:(res)=>{
          console.log('promote result', res.data)
          var r = res.data
          for(var i = 0; i < r.length; i++){
            var dateV = new Date(r[i].date.toString())
            r[i].dateStr = dateV.getFullYear().toString() + '-' + (dateV.getMonth()+1).toString() + '-' + dateV.getDate().toString()
          }
          that.setData({result:r})
        }
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})