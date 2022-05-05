// pages/customer/media/play.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    sessionKey:'',
    id: 0,
    thumb: '',
    title: '',
    mediaPlayUrl:'',
    percent: 0,
    media:{},




    totalLength:3245,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this
    app.loginPromise.then(function(resolve){
      var id = parseInt(options.id)
      var getInfoUrl = app.globalData.requestPrefix + 'Media/GetMedia/' + id
      wx.request({
        url: getInfoUrl,
        method: 'GET',
        success: (res) => {
          console.log('Get media info:', res)

          var playUrl = app.globalData.requestPrefix + 'Media/PlayMedia/' + id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
          that.setData({id: id, sessionKey: app.globalData.sessionKey, thumb: res.data.thumb, title: res.data.name, mediaPlayUrl: playUrl, media: res.data})
          var getProcessUrl = app.globalData.requestPrefix + 'UserStudyProgress/GetProgress/' + id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
          wx.request({
            url: getProcessUrl,
            method: 'GET',
            success:(res)=>{
              console.log('Get Process:', res)
              var media = that.data.media
              for(var i = 0; i < media.mediaSubTitles.length; i++){
                media.mediaSubTitles[i].progress = 0
                for(var j = 0; j < res.data.length; j++){
                  if (media.mediaSubTitles[i].id == res.data[j].mediaSubTitle.id){
                    media.mediaSubTitles[i].progress = res.data[j].progress
                  }
                }
              }
              that.setData({media: media})
            }
          })
          that.audio.src = playUrl
          /*
          that.audio.seek(1000)
          
          that.audio.onCanplay(()=>{
            that.audio.play()
          })
          
          that.audio.onTimeUpdate(()=>{

            console.log('time update', that.audio.currentTime)
            that.setData({percent: parseInt(100*that.audio.currentTime/that.data.totalLength)})
          })
          */
        }
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    var that = this
    this.audio = wx.createInnerAudioContext()
    this.audio.onPlay(()=>{
      console.log('play')
    })
    this.audio.onTimeUpdate(()=>{
      console.log('time update', that.audio.currentTime)
      var currentSeg = 0
      var media = that.data.media
      for(var i = 0; i < media.mediaSubTitles.length; i++){
        if (media.mediaSubTitles[i].start_position <= that.audio.currentTime
          && media.mediaSubTitles[i].end_position >= that.audio.currentTime){
            currentSeg = i
            break
          }
      }
      var newProgress = parseInt(100 * (that.audio.currentTime - media.mediaSubTitles[currentSeg].start_position)
        / (media.mediaSubTitles[currentSeg].end_position - media.mediaSubTitles[currentSeg].start_position))
      if (newProgress > media.mediaSubTitles[currentSeg].progress){
        media.mediaSubTitles[currentSeg].progress = newProgress
        that.setData({media: media})
        var updateProgressUrl = app.globalData.requestPrefix + 'UserStudyProgress/SetProgress/' + media.mediaSubTitles[currentSeg].id + '?progress=' + newProgress + '&sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
        wx.request({
          url: updateProgressUrl,
          method: 'GET',
          success:(res)=>{
            console.log('Set Progress:', res)
          }
        })
      }
      //that.setData({percent: parseInt(100*that.audio.currentTime/that.data.totalLength)})
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

  },
  play: function(seg, progress){
    var that = this
    var media = that.data.media
    var mediaSubTitle = media.mediaSubTitles[seg]
    var seek = mediaSubTitle.start_position + parseInt((mediaSubTitle.end_position - mediaSubTitle.start_position) * parseFloat(progress/100))
    that.audio.seek(seek)
    //that.audio.play()
  
    that.audio.onCanplay(()=>{
      that.audio.play()
    })
    
  },
  tapContinue:function(e){
    var seg = 0
    var progress = 0
    var that = this
    var mediaSubTitles = that.data.media.mediaSubTitles
    for(var i = 0; i < mediaSubTitles.length; i++){
      if (mediaSubTitles[i].progress != 100){
        seg = i
        progress = mediaSubTitles[i].progress
        break
      }
    }
    that.play(seg, progress)
  },
  tapStop:function(e){
    this.audio.pause()
  },
  playSeg:function(e){
    console.log('play seg:', e)
    var id = parseInt(e.currentTarget.id.replace('subtitle_', ''))
    var that = this
    var media = that.data.media
    var seek = 0
    for(var i = 0; i < media.mediaSubTitles.length; i++){
      if (media.mediaSubTitles[i].id == id){
        that.play(i, 0)
        break;
      }
    }
    
  }
  
})