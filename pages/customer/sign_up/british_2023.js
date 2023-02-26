// pages/customer/sign_up/british_2023.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    name: '',
    cell: '',
    success: false
  },

  setInput(e){
    var id = e.currentTarget.id
    var that = this
    switch(id){
      case 'name':
        that.setData({name: e.detail.value})
        break
      case 'cell':
        that.setData({cell: e.detail.value})
        break
      default:
        break
    }
  },
  submit(){
    var that = this
    var name = that.data.name
    var cell = that.data.cell
    if (name == '' ){
      wx.showToast({
        title: '请填写称呼。',
        icon: 'error',
        duration: 1000
        
      })
    }
    else if (cell.length != 11 || isNaN(parseFloat(cell))){
      wx.showToast({
        title: '请填写手机号。',
        icon: 'error',
        duration: 1000
        
      })
    }
    else{
      var submitUrl = app.globalData.requestPrefix + 'Reserve/Reserve/1?name=' + encodeURIComponent(name) + '&cell=' + encodeURIComponent(cell) + '&sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      wx.request({
        url: submitUrl,
        method: 'GET',
        success:(res)=>{
          console.log('reserve', res)
          if (res.statusCode == 200){
            that.setData({success: true})
          }
          else{
            wx.showToast({
              title: '领取失败',
              icon: 'error'
            })
          }
        }
      })
      //that.setData({success: true})
    }
  },

  hide(){
    var that = this
    that.setData({success: false})
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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