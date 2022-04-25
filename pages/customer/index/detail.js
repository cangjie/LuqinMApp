// pages/customer/index/detail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    id:'',
    url:'',
    title:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({id: options.id})
    var that = this
    app.loginPromise.then(function(resolve){
      that.setData({tabBar: app.globalData.userTabBar})
      var contentUrl = 'https://mini.luqinwenda.com/api/MiniAppHelper/GetHomePageArcitle'
      wx.request({
        url: contentUrl,
        success:(res)=>{
          var news = res.data.item[that.data.id].content.news_item[0]
          console.log('Current article:', news)
          that.setData({title: news.title, url: 'https://mini.luqinwenda.com/api/MiniAppHelper/GetMpContent?url=' + encodeURIComponent(news.url)})
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

  }
})