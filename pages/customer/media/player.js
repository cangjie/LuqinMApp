// pages/customer/media/player.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    allowSeek: false,
    mediaUrl: '',
    id: 0,
    currentStatus: 'loading',
    media:{},
    message:'查找断点',
    percent: 0,
    allowPlay: false,
    isPlaying: false,
    currentTitle:'',
    currentPosition: 0,
    currentSubTitleId: 0,
    willPlay: false
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
          //that.setData({media: res.data})
          var timer
          var media = res.data
          var mediaDataUrl = app.globalData.requestPrefix + 'Media/PlayMedia/' + res.data.id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
          that.audio.src = mediaDataUrl
          var downloadTask = wx.downloadFile({
            url: mediaDataUrl,
            method: 'GET',
            timeout: 30000,
            success:(res)=>{
              console.log('download success.', res)
              that.setData({percent: 100, message: '载入成功', allowSeek: true, allowPlay: true, 
              currentStatus: '', percent: that.data.media.mediaSubTitles[that.data.currentSubTitleId].progress})
              that.audio.src = res.tempFilePath
            },
            fail:(res)=>{
              console.log('download fail.', res)
              that.audio.src = mediaDataUrl
              that.setData({allowSeek: false, message: '无法找到断点', allowPlay: true, currentStatus: '', percent: 0})
            },
            complete:(res)=>{
              clearInterval(timer)
              //that.setData({currentStatus: '', percent: that.data.media.mediaSubTitles[that.data.currentSubTitleId].progress})
            }
          })
          that.downloadTask = downloadTask
          timer = setInterval(() => {
            downloadTask.onProgressUpdate((res)=>{
              console.log('download progress', res)
              var percent = parseInt(100 * res.totalBytesWritten/1024/1024/that.data.media.file_size)
              that.setData({percent: percent})
              downloadTask.offProgressUpdate()
            })
          }, 3000);

          var getProcessUrl = app.globalData.requestPrefix + 'UserStudyProgress/GetProgress/' + media.id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
          wx.request({
            url: getProcessUrl,
            method: 'GET',
            success:(res)=>{
              var currentTitle = ''//media.mediaSubTitles.length > 0? media.mediaSubTitles[0].title : media.name
              var currentPosition = 0
              var currentPercent = 0
              var currentSubTitleId = 0
              for(var i = 0; i < media.mediaSubTitles.length; i++){
                media.mediaSubTitles[i].progress = 0
                for(var j = 0; j < res.data.length; j++){
                  if (media.mediaSubTitles[i].id == res.data[j].mediaSubTitle.id){
                    media.mediaSubTitles[i].progress = res.data[j].progress
                    break
                  }
                }
                if (media.mediaSubTitles[i].progress < 100 && currentTitle == ''){
                  currentTitle = media.mediaSubTitles[i].title
                  currentPercent = media.mediaSubTitles[i].progress
                  currentPosition = media.mediaSubTitles[i].start_position 
                    + parseInt((media.mediaSubTitles[i].end_position - media.mediaSubTitles[i].start_position) * media.mediaSubTitles[i].progress / 100)
                  currentSubTitleId = i
                }
              }
              that.setData({media: media, currentTitle: currentTitle, currentPosition: currentPosition, currentSubTitleId: currentSubTitleId})
            }
          })


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
      if (that.data.willPlay){
        //that.setData({willPlay: false})
        if (that.data.isPlaying){
          that.audio.pause()
        }
        that.audio.play()
      }
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
    that.audio.onSeeking(()=>{
      console.log('seeking')
      setTimeout(()=>{
        if (!that.data.isPlaying){
          that.audio.play()
        }
      }, 1000)
    })
    that.audio.onSeeked(()=>{
      console.log('seeked')
      that.setData({isPlaying: true})
      that.audio.play()
      //that.data.willPlay = false
      //that.setData({willPlay: true})
    })
  },

  play: function(){
    var that = this
    that.downloadTask.abort()
    if (that.data.allowSeek){
      that.data.willPlay = true
      that.audio.seek(that.data.currentPosition)

    }
    else{
      that.audio.play()
    }
      //that.setData({willPlay: true})
    
    
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