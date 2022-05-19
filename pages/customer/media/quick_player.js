// pages/customer/media/quick_player.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentTitle: '',
    currentTime: 0,
    isPlaying: false,
    isTimeMeterRun: false,
    message: '',

    canSeek: false,
    message2: ''

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({message2: this.data.message2 + ' onload'})
    var that = this

    that.fs = wx.getFileSystemManager()
    that.userDataRoot = wx.env.USER_DATA_PATH
    that.audio = wx.createInnerAudioContext()

    var getMediaInfoPromise = new Promise(function(resolve){
      var getMediaInfoUrl = app.globalData.requestPrefix + 'Media/GetMedia/' + options.id
      wx.request({
        url: getMediaInfoUrl,
        method:'GET',
        success:(res)=>{
          resolve(res.data)
        }
      })
    })
    app.loginPromise.then((resolve)=>{
      that.setData({message: '已登录'})
      var getMediaFilePromise = new Promise(function(resolve){
        var remoteMediaUrl = app.globalData.requestPrefix + 'Media/PlayMedia/' + options.id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
        var localMediaUrl = that.userDataRoot + '/' + options.id + '.mp3'
        that.fs.access({
          path: localMediaUrl,
          success:(res)=>{
            console.log('file access:', res)
            that.setData({canSeek: true, message: '继续学习', remoteMediaUrl: remoteMediaUrl, localMediaUrl: localMediaUrl})
            resolve({mediaUrl: localMediaUrl})
          },
          fail:(res)=>{
            console.log('file can not access:', res)
            that.setData({canSeek: false, message: '开始学习', remoteMediaUrl: remoteMediaUrl, localMediaUrl: ''})
            resolve({mediaUrl: remoteMediaUrl})
          }
        })

      })



      getMediaInfoPromise.then((resolve)=>{
        var media = resolve
        var getProcessUrl = app.globalData.requestPrefix + 'UserStudyProgress/GetProgress/' + media.id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
        wx.request({
          url: getProcessUrl,
          method: 'GET',
          success:(res)=>{
            that.setData({message: '课程加载完成'})
            var currentSeg = -1
            var lastDate = new Date('2022-1-1')
            for(var i = 0; i < media.mediaSubTitles.length; i++){
              media.mediaSubTitles[i].progress = 0
              for(var j = 0; j < res.data.length; j++){
                if (media.mediaSubTitles[i].id == res.data[j].media_subtitle_id){
                  media.mediaSubTitles[i].progress = res.data[j].progress
                  var updateDate = new Date(res.data[j].update_date.toString())
                  if (lastDate < updateDate){
                    lastDate = updateDate
                  }
                  break
                }
              }
              if (media.mediaSubTitles[i].progress < 100 && currentSeg == -1){
                currentSeg = i
                
              }
            }
            if (currentSeg == -1){
              currentSeg = 0
            }
            var progress = media.mediaSubTitles[currentSeg].progress
            var currentTime = media.mediaSubTitles[currentSeg].start_position 
              + parseInt((media.mediaSubTitles[currentSeg].end_position - media.mediaSubTitles[currentSeg].start_position) * progress/100)

            that.setData({media: media, currentSeg: currentSeg, lastDate: lastDate, percent: progress, currentTime: currentTime})

            getMediaFilePromise.then((resolve)=>{
              that.audio.src = resolve.mediaUrl
              var nowDate = new Date()
              var day = nowDate.getDate() - 3
              nowDate.setDate(day)
              if (that.data.localMediaUrl == '' || nowDate > that.data.lastDate){
                console.log('need refresh')
                var downloadTimer
                var downloadTask = wx.downloadFile({
                  url: that.data.remoteMediaUrl,
                  success:(res)=>{
                    console.log('download success', res)
                    that.fs.saveFile({
                      tempFilePath: res.tempFilePath,
                      filePath: wx.env.USER_DATA_PATH  + '/' + options.id + '.mp3',
                      success:(res)=>{
                        that.setData({localMediaUrl: wx.env.USER_DATA_PATH  + '/' + options.id + '.mp3', canSeek: true})
                        console.log('file refreshed')
                      }
                    })
                  },
                  fail:(res)=>{
                    console.log('download failed', res)
                  }
                })
                
              }
            })

          }
        })
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */

  setProgress: function(currentTime){
    console.log('playing', currentTime)
    var that = this
    var media = that.data.media
    var currentSeg = 0
    for(var i = 0; i < media.mediaSubTitles.length; i++){
      if (media.mediaSubTitles[i].start_position <= currentTime 
        && media.mediaSubTitles[i].end_position >= currentTime){
          currentSeg = i
          break
      }
    }
    if (that.data.currentSeg != currentSeg){
      that.setData({currentSeg: currentSeg})
    }
    var progress = parseInt(100 * (currentTime - media.mediaSubTitles[currentSeg].start_position)
      / (media.mediaSubTitles[currentSeg].end_position - media.mediaSubTitles[currentSeg].start_position))
    
    if (progress > 100){
      progress = 100
    }
    if (progress > that.data.percent){
      that.setData({percent: progress})
    }
    if (progress > media.mediaSubTitles[currentSeg].progress){
      var updateProgressUrl = app.globalData.requestPrefix + 'UserStudyProgress/SetProgress/' + media.mediaSubTitles[currentSeg].id + '?progress=' + progress + '&sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      wx.request({
        url: updateProgressUrl,
        method: 'GET',
        success:(res)=>{
          console.log('Set Progress:', res)
          media.mediaSubTitles[currentSeg].progress = progress
          that.setData({currentSeg: currentSeg, percent: progress, media: media})
        }
      })
    }
  },

  onReady() {
    this.setData({message2:  this.data.message2 + ' onready'})
    var that = this
    that.audio.onTimeUpdate(()=>{
      
      if (!that.data.isPlaying){
        that.setData({isPlaying: true})
      }
      if (that.audio.src != that.data.remoteMediaUrl){
        that.setProgress(that.audio.currentTime)
      }
     
    })
    that.audio.onPause(()=>{
      console.log('paused')
      if (that.timeMeter != null && that.timeMeter != undefined){
        clearInterval(that.timeMeter)
      }
      that.setData({currentTime: that.audio.currentTime, isPlaying: false, isPlayingMeterRun: false})  
      
    })
    that.audio.onSeeked(()=>{
      console.log('seeked')
      that.setData({message: '跳转完成', isPlaying: true})
      that.audio.play()
    })
    that.audio.onSeeking(()=>{
      console.log('seeking')
      that.setData({message: '正在跳转'})
      setTimeout(() => {
        if (!that.data.isPlaying){
          that.audio.play()
        }
      }, 5000);
    })
  },
  play: function(e){
    console.log('button pressed', e)
    var that = this
    that.setData({message: '准备播放'})
    var media = that.data.media
    if (that.data.isPlaying){
      that.audio.pause()
    }
    if (that.data.localMediaUrl!='' && that.audio.src != that.data.localMediaUrl){
      that.setData({message: '准备播放', canSeek: true})
      that.audio.src = that.data.localMediaUrl
    }
    if (that.data.canSeek){
      var currentTime = that.audio.currentTime
      if (currentTime == 0){
        currentTime = that.data.currentTime
      }
      var currentSeg = that.data.currentSeg
      switch(e.currentTarget.id){
        case 'back':
          currentTime = currentTime - 15
          break
        case 'forward':
          currentTime = currentTime + 15
          break
        case 'prev':
          currentSeg--
          if (currentSeg>=0){
            currentTime = media.mediaSubTitles[currentSeg].start_position
            that.setData({percent: 0})
          }
          break
        case 'next':
          currentSeg++
          if (currentSeg < media.mediaSubTitles.length){
            currentTime = media.mediaSubTitles[currentSeg].start_position
            that.setData({percent: 0})
          }
        default:
          break
      }
      that.setData({message: that.audio.src + '跳转到断点' + currentTime})
      that.audio.seek(currentTime)
    }
    else{
      that.setData({message: '顺序播放'})
      that.audio.src = that.data.remoteMediaUrl
      that.data.currentTime = 0
      that.timeMeter = setInterval(()=>{
        that.data.currentTime++
        that.setProgress(that.data.currentTime)
      }, 1000)
      that.audio.play()
    }
  },
  pause: function(){
    console.log('pause button pressed')
    var that = this
    that.setData({currentTime: that.audio.currentTime})
    if (that.timeMeter != null && that.timeMeter != undefined){
      clearInterval(that.timeMeter)
    }
    that.audio.pause()
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    this.setData({message2:  this.data.message2 + ' onshow'})
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {
    this.audio.pause()
    this.setData({isPlaying: false})
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {
    this.audio.pause()
    this.setData({isPlaying: false})
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

  },
  handleContact(e) {
    console.log('contact:', e)
    wx.requestSubscribeMessage({
      tmplIds: ['SfJLu70mJCZ0RNskHeEznILvwHMibYIWu9pgZ3EqJ4U',
        'X0VzPuS1TpHvehKPJIA30fX9RW0uU9QBZP4j06gTJpw',
        's5LqBjHSqL1CyDQWZkyhA-1u7HjF0ME_P8XSM2eBtME'],
      success:(res)=>{
        console.log('subscribe message:', res)
      }
    })
  }
})