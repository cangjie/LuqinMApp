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
    message: '',

    canSeek: false,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this
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
            var currentSeg = -1
            var lastDate = new Date('2022-1-1')
            for(var i = 0; i < media.mediaSubTitles.length; i++){
              media.mediaSubTitles[i].progress = 0
              for(var j = 0; j < res.data.length; j++){
                if (media.mediaSubTitles[i].id == res.data[j].mediaSubTitle.id){
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
            that.setData({media: media, currentSeg: currentSeg, lastDate: lastDate})

            getMediaFilePromise.then((resolve)=>{
              that.audio.src = resolve.mediaUrl
              var nowDate = new Date()
              var day = nowDate.getDate() - 3
              nowDate.setDate(day)
              if (that.data.localMediaUrl == '' || nowDate > that.data.lastDate){
                console.log('need refresh')
                wx.downloadFile({
                  url: that.data.remoteMediaUrl,
                  success:(res)=>{
                    that.fs.saveFile({
                      tempFilePath: res.tempFilePath,
                      filePath: wx.env.USER_DATA_PATH  + '/' + options.id + '.mp3',
                      success:(res)=>{
                        that.setData({localMediaUrl: wx.env.USER_DATA_PATH  + '/' + options.id + '.mp3'})
                        console.log('file refreshed')
                      }
                    })
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
  onReady() {
    var that = this
    that.fs = wx.getFileSystemManager()
    that.userDataRoot = wx.env.USER_DATA_PATH
    that.audio = wx.createInnerAudioContext()
   
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