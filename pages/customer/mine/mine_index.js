// pages/customer/mine/mine_index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tabCurrentIndex: 1,
    tabBar:{},
    questionText: '',
    questionList:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    app.loginPromise.then(function(resolve){
      console.log(resolve)
      that.setData({tabBar: app.globalData.userTabBar})
      that.getQuestions()
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
  questionInput:function(e){
    console.log(e)
    var that = this
    that.setData({questionText: e.detail.value})
  },
  submitQuestion:function(){
    var that = this
    var url = app.globalData.requestPrefix + 'Question/PostQuestion?sessionKey=' 
      + encodeURIComponent(app.globalData.sessionKey)
    if (that.data.questionText.trim()==''){
      return;
    }
    var question = {
      id: 0,
      user_id: 0,
      topic: that.data.questionText,
      status: '未读'
    }
    wx.request({
      url: url,
      method:'post',
      data: question,
      success:(res)=>{
        console.log(res)
        wx.showToast({
          title: '您的问题已送达',
        })
        that.getQuestions()
      }
    })
  },
  getQuestions: function(){
    var that = this
    var url = app.globalData.requestPrefix + 'Question/GetQuestion?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
    wx.request({
      url: url,
      method: 'GET',
      success:(res)=>{
        
        for(var i = 0; i < res.data.length; i++){
          var qTime = new Date(res.data[i].create_date)
          res.data[i].create_date = qTime.getFullYear().toString() + '-' + (qTime.getMonth() + 1).toString() + '-' + qTime.getDay().toString()
        }
        console.log(res)
        that.setData({questionList: res.data})
      }
    })
  }
})