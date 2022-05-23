// pages/customer/payment/payment_test.js
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
    app.loginPromise.then((resolve) => {
      
    })
  },

  setAmount(e){
    console.log(e)
    this.setData({amount: e.detail.value})
  },

  testPay(e){
    var that = this
    var prePayUrl = app.globalData.requestPrefix + 'Wepay/Pay/1?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)  + '&amount=' + that.data.amount + '&memo=test'
    wx.request({
      url: prePayUrl,
      method: 'GET',
      success:(res)=>{
        console.log('prepay', res)
        wx.requestPayment({
          nonceStr: res.data.nonce,
          package: 'prepay_id='+res.data.prepay_id,
          paySign: res.data.sign,
          timeStamp: res.data.timestamp,
          signType: 'MD5',
          success:(res)=>{
            console.log(res)
          },
          fail:(res)=>{
            console.log(res)
          }
        })
      }
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