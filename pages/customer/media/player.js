// pages/customer/media/player.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    allowSeek: true,
    mediaUrl: '',
    id: 0,
    currentStatus: 'loading',
    media:{},
    message:'载入中。。。',
    percent: 0,
    allowPlay: false,
    isPlaying: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    
    app.loginPromise.then((resolve)=>{
      var getMediaInfoUrl = app.globalData.requestPrefix + 'Media/GetMedia/' + options.id
      wx.request({
        url: getMediaInfoUrl,
        method: 'GET',
        success:(res)=>{
          that.setData({media: res.data})
          var mediaDataUrl = app.globalData.requestPrefix + 'Media/PlayMedia/' + res.data.id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
          var downloadTask = wx.downloadFile({
            url: mediaDataUrl,
            method: 'GET',
            timeout: 15000,
            success:(res)=>{
              console.log('download success.', res)
              that.setData({percent: 100, message: '载入成功', allowSeek: true, allowPlay: true})
              that.audio.src = res.tempFilePath
            },
            fail:(res)=>{
              console.log('download fail.', res)
              that.audio.src = mediaDataUrl
              that.setData({allowSeek: false, message: '载入失败，从头开始', allowPlay: true})
            }
          })
          setInterval(() => {
            downloadTask.onProgressUpdate((res)=>{
              console.log('download progress', res)
              var percent = parseInt(100 * res.totalBytesWritten/1024/1024/that.data.media.file_size)
              that.setData({percent: percent})
              downloadTask.offProgressUpdate()
            })
          }, 3000);
        }
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    var that = this
    that.audio = wx.createInnerAudioContext()
    that.audio.onCanplay(()=>{
      console.log('can play')
    })
    that.audio.onTimeUpdate(()=>{
      console.log('playing', that.audio.currentTime)
      if (!that.data.isPlaying){
        that.setData({isPlaying: true})
      }
    })
    that.audio.onPause(()=>{
      that.setData({isPlaying: false})
    })
  },

  play: function(){
    var that = this
    if (that.data.allowPlay){
      that.audio.play()
    }
    
  },
  pause: function(){
    var that = this
    if (that.data.isPlaying){
      that.audio.pause()
    }
  },
  playSeg:function(e){
    console.log('Play:', e)
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