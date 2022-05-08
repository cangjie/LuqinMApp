// pages/customer/media/uni_player.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    enable: false,
    id: 0,
    playUrl: '',
    seekTimes: 0,
    seekStep: 10,
    seekCurrent: 0
  },



  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    app.loginPromise.then(()=>{
      var playUrl = app.globalData.requestPrefix + 'Media/PlayMedia/4?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      that.setData({playUrl: playUrl})
      var getMediaPromise = new Promise((resolve)=>{
        wx.getSystemInfo({
          success: (result) => {
            if (result.system.toLowerCase().indexOf('ios1') < 0){
              that.data.os = 'ios'
              var downloadTask = wx.downloadFile({
                url: playUrl,
                timeout: 5000,
                //filePath: 'http://tmp/4.mp3',
                success:(res)=>{
                  resolve({mediaUrl: res.tempFilePath})
                },
                fail:(res)=>{
                  console.log('download fail:', res)
                },
                complete:(res)=>{
                  console.log('download complete:',res)
                }
              })
              setInterval(()=>{
                downloadTask.onProgressUpdate((e)=>{
                  console.log('download ', e)
                  downloadTask.offProgressUpdate()
                })
              }, 5000)
              
            }
            else{
              that.data.os = 'android'
              resolve({mediaUrl: playUrl})
            }
          },
        })

      })
      getMediaPromise.then((res)=>{
        that.audio = wx.createInnerAudioContext()
        that.audio.src = res.mediaUrl
        that.audio.onCanplay(()=>{
          that.setData({enable: true})
          //that.audio.volume = 0
          //that.audio.playbackRate = 2
          //that.audio.play()
        })
        that.audio.onSeeking(()=>{
          console.log('seeking ', that.data.seekCurrent)
          if (that.data.os == 'android'){
            
            var times = that.data.seekTimes
            if (times == 0){
              that.audio.play()
            }
            else{
              that.audio.pause()
              if (times > 0){
                times--
                var seekPos = that.data.seekCurrent + that.data.seekStep
                that.data.seekCurrent = seekPos
                that.data.seekTimes = times
                //that.audio.play()
                setTimeout(()=>{that.audio.seek(seekPos)}, 500)
              }
              else{
                times++
                var seekPos = that.data.seekCurrent - that.data.seekStep
                that.data.seekCurrent = seekPos
                that.data.seekTimes = times
                setTimeout(()=>{that.audio.seek(seekPos)}, 100)
              }
            }
          }
          
        })
        that.audio.onSeeked(()=>{
          console.log('seeked ', that.data.seekTimes)
          if (that.data.os == 'ios'){
            that.audio.play()
          }
          else{
            that.audio.play()
          }
          /*
          var times = that.data.seekTimes
          if (times == 0){
            that.audio.play()
          }
          else{
            //that.audio.play()
            if (times > 0){
              times--
              var seekPos = that.data.seekCurrent + that.data.seekStep
              that.data.seekCurrent = seekPos
              that.data.seekTimes = times
              that.audio.play()
              //that.audio.seek(seekPos)
            }
            else{
              times++
              var seekPos = that.data.seekCurrent - that.data.seekStep
              that.data.seekCurrent = seekPos
              that.data.seekTimes = times
              //that.audio.seek(seekPos)
            }
          }
          */
        })
        that.audio.onTimeUpdate(()=>{
          console.log(that.audio.currentTime + ' ' + that.audio.buffered)
        })
      })
    })
  },
  forward: function(){
    var that = this
    that.audio.pause()
    var target = 1050
    if (that.data.os == 'ios'){
      that.audio.seek(target)
    }
    else{
      var current = that.audio.currentTime
      that.data.seekCurrent = current
      var times = (target - current)/that.data.seekStep
      if (times < 0) {
        times = times - 1
      }
      if (times > 0) {
        times--
        that.data.seekTimes = times
        that.audio.seek(that.data.seekCurrent+that.data.seekStep)
      }
      else{
        times++
        that.data.seekTimes = times
        that.audio.seek(that.data.seekCurrent-that.data.seekStep) 
      }
    }



    
  },
  bufferSeek: function(){
    var that = this
    that.audio.pause()
    that.audio.volume = 1
    that.audio.seek(20)
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
    var that = this
    that.audio.pause()
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    var that = this
    that.audio.distory()
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