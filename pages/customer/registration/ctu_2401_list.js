// pages/customer/registration/ctu_2401_list.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * Page initial data
   */
  data: {

  },

  reg(){
    wx.navigateTo({
      url: 'ctu_2401',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('load')
    var that = this
    app.loginPromise.then(function(resolve){
      console.log('page load', resolve)
      that.init()
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    console.log('ready')
    
  },



  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    console.log('show')
    var that = this
    if (util.isBlank(that.data)){
      that.init()
    }
  },

  init(){
    if (app.globalData.sessionKey == undefined 
      || app.globalData.sessionKey == null
      || app.globalData.sessionKey == ''){
        return
    }
    var that = this
    var getUrl = app.globalData.requestPrefix + 'CampRegistration/GetList?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
    wx.request({
      url: getUrl,
      method: 'GET',
      success:(res)=>{
        console.log('get camp reg list', res)
        if (res.statusCode != 200){
          return
        }
        that.setData({regList: res.data})
      }
    })
  },

  gotoDetail(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: 'ctu_2401?id=' + id,
    })
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