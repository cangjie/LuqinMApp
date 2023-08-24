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
              id: i.toString(),
              title: itemList[i].content.news_item[0].title,
              thumb: itemList[i].content.news_item[0].thumb_url,
              media_id: itemList[i].content.media_id
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
  
  tabSwitch: function(e){
    console.log('TabSwitch:', e)
    var url = e.detail.item.pagePath
    wx.redirectTo({
      url: url
    })
  },
  gotoDetail: function(e){
    console.log('Go to detail:', e)
    wx.navigateTo({
      url: 'detail?id='+e.currentTarget.id,
    })
  }

})