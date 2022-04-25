// pages/customer/index/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    sessionKey: '',
    tabCurrentIndex: 0,
    tabBar:{},
    articleList:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    app.loginPromise.then(function(resolve){
      console.log(resolve)
      that.setData({tabBar: app.globalData.userTabBar})
      var contentUrl = 'https://mini.luqinwenda.com/api/MiniAppHelper/GetHomePageArcitle'
      wx.request({
        url: contentUrl,
        method: 'GET',
        success:(res)=>{
          console.log('home page:', res)
          
          var articleList = []
          var itemList = res.data.item
          for(var i = 0; i < 5; i++){
            articleList[i] = {
              title: itemList[i].content.news_item[0].title,
              thumb: itemList[i].content.news_item[0].thumb_url,
              media_id: itemList[i].content.news_item[0].thumb_media_id
            }
          }
          that.setData({articleList: articleList})
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
  gotoNext: function(){
    wx.navigateTo({
      url: 'http://mp.weixin.qq.com/s?__biz=MzA3MTM1OTIwNg==&mid=2654310676&idx=1&sn=34b67a6623d889e2a10911b1d7fa8dfc&chksm=84effe9db398778b39d405e005426525d8c42417ecc842b0e2f716c6a710b5a558630fffee29#rd',
    })
  },
  tabSwitch: function(e){
    console.log('TabSwitch:', e)
    var url = e.detail.item.pagePath
    wx.redirectTo({
      url: url
    })
  }

})