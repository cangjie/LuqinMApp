// pages/customer/media/test_play.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    willPlay: 0,
    playing: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    app.loginPromise.then(function(resolve){
      var playUrl = app.globalData.requestPrefix + 'Media/PlayMedia/4?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      that.audio.src = playUrl
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    var that = this
    this.audio = wx.createInnerAudioContext()
    this.audio.onCanplay(()=>{
      console.log('can play')
      if (that.data.willPlay == 1){
        //that.audio.pause()
        //that.audio.play()
      }
      //that.audio.play()
    })
    this.audio.onPlay(()=>{
      console.log('start play')
    })
    this.audio.onTimeUpdate(()=>{
      console.log(that.audio.currentTime)
    })

    this.audio.onSeeking(()=>{
      console.log('seeking')
    
    })
    this.audio.onSeeked(()=>{
      console.log('seeked')
      //that.audio.play()
    })
    
  },

  stop: function(){
    this.audio.pause()
  },

  seek: function() {
    var that = this
    this.setData({willPlay: 1})
    //this.audio.play()
    //this.audio.pause()
   // this.audio.startTime = 1000
    //this.audio.play()
    this.audio.seek(1000)
    setTimeout(()=>{
      that.audio.play()
    }, 1000)
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