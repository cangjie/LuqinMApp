// pages/customer/media/download_play.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    start: 1300,
    isPlaying: false,
    localFilePath: '',
    needDownload: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this
    app.loginPromise.then((resolve)=>{
      that.data.playUrl = app.globalData.requestPrefix + 'Media/PlayMedia/4?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      that.audio.src = that.data.playUrl
      that.fs.access({
        path: wx.env.USER_DATA_PATH + '/4.mp3',
        success: (res)=>{
          console.log('file access:', res)
          that.audio.src = wx.env.USER_DATA_PATH + '/4.mp3'
          that.fs.getFileInfo({
            filePath: wx.env.USER_DATA_PATH + '/4.mp3',
            success:(res)=>{
              console.log('file info', res)
            }
          })
        },
        fail: (res)=>{
          console.log('file can not access', res)
          wx.downloadFile({
            url: that.data.playUrl,
            success:(res)=>{
              console.log('down load success', res)
              that.data.localFilePath = res.tempFilePath
              that.fs.saveFile({
                tempFilePath: res.tempFilePath,
                filePath: wx.env.USER_DATA_PATH + '/4.mp3',
                success:(res)=>{
                  console.log('file saved', res)
                }
              })
              /*
              that.audio.src = res.tempFilePath
              if (that.data.isPlaying){
                that.audio.play()
              }
              */
            }
          })
        }
      })

    })
  },

  seek: function(){
    var that = this
    that.audio.seek(that.data.start)
  },
  stop: function(){
    var that = this
    that.audio.pause()
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    var that = this
    that.audio = wx.createInnerAudioContext()
    that.fs = wx.getFileSystemManager()

    that.audio.onSeeked(()=>{
      console.log('seeked')
      that.audio.play()
    })
    that.audio.onSeeking(()=>{
      console.log('seeking')
      setTimeout(()=>{that.audio.play()}, 1000)
    })
    that.audio.onTimeUpdate(()=>{
      console.log('playing', that.audio.currentTime)
      if (!that.data.isPlaying){
        that.setData({isPlaying: true})
      }
      if (that.data.needDownload){
        that.data.needDownload = false
        wx.downloadFile({
          url: that.data.playUrl,
          success:(res)=>{
            that.fs.saveFile({
              tempFilePath: res.tempFilePath,
              filePath: wx.env.USER_DATA_PATH + '/4.mp3',
              success:(res)=>{
                console.log('file saved', res)
              }
            })
          }
        })
      }
    })
    that.audio.onPause(()=>{
      console.log('pause')
      that.setData({isPlaying: false})
    })
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