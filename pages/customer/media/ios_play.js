// pages/customer/media/ios_play.js
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
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
      },
    })
    var that = this
    that.audio = wx.createInnerAudioContext()
    that.audio.onSeeking(()=>{
      console.log('seeking')
    })
    that.audio.onSeeked(()=>{
      console.log('seeked')
      that.audio.pause()
      that.audio.play()
    })
    app.loginPromise.then(function(resolve){
      var playUrl = app.globalData.requestPrefix + 'Media/PlayMedia/4?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      wx.downloadFile({
        url: playUrl,
        success:(res)=>{
          console.log('download file', res)
          that.audio.src = res.tempFilePath
          console.log('Duration: ' + that.audio.duration)
        }
      })
      /*
      that.audio.src = playUrl
      that.audio.onCanplay(()=>{
        console.log('duration:' + that.audio.duration)
      })
      */
    })
  },
  stop: function(){
    this.audio.pause()
  },

  seek: function() {
    var that = this
    //that.audio.startTime = 100
    that.audio.play()
    that.audio.pause()
    that.audio.seek(1000)
    
    
    

    /*
    that.audio.seek(10)
    setTimeout(()=>{

      that.audio.play()
    },5000)
    */
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