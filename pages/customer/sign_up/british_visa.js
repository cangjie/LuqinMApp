// pages/customer/sign_up/british_visa.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    status: 0,

    
    cityList:[{"name":"==请选择城市==", "id":"-1"},{"name":"北京", "id":"0"},{"name":"长沙", "id":"1"},{"name": "成都", "id": "2"},{"name":"重庆", "id": "3"},
      {"name": "福州", "id": "4"},{"name":"广州", "id": "5"},{"name":"杭州", "id": "6"},{"name":"济南", "id": "7"},
      {"name": "昆明", "id": "8"},{"name":"南京", "id": "9"},{"name":"上海", "id": "10"},{"name":"沈阳", "id": "11"},
      {"name":"深圳", "id": "12"},{"name":"武汉", "id": "13"},{"name":"西安", "id": "14"}],
    name: '',
    citySelectedIndex: 0,
    city: '',
    memo:'',
    memoLength: 50
  },

  setMemo(e){
    var that = this
    var value = e.detail.value
    var memo = that.data.memo
    if (value.length <= that.data.memoLength){
      that.setData({memo: value})
    }
    else{
      that.setData({memo: memo})
    }
    
  },

  setName(e){
    var that = this
    var value = e.detail.value
    that.setData({name: value})
  },


  onSelectItem(e){
    console.log('select city', e)
    var that = this
    that.setData({city: e.detail.name})
  },
  save(){
    var msg = ''
    var that = this
    if (that.data.name == ''){
      msg = '请填写孩子姓名。'
    }
    else if (that.data.city == ''){
      msg = '请选择城市。'
    }
    if (msg != ''){
      wx.showToast({
        title: msg,
        icon: 'error'
      })
      return
    }
    that.setData({status: 1})
  },
  mod(){
    var that = this
    that.setData({status: 0})
  },

  submit(){
    var that = this
    var subUrl = app.globalData.requestPrefix + 'Health/SelectVisaCity?childName=' + encodeURIComponent(that.data.name) + '&city=' + encodeURIComponent(that.data.city) + '&memo=' + encodeURIComponent(that.data.memo) + '&sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
    wx.request({
      url: subUrl,
      method:'GET',
      success:(res)=>{
        if (res.statusCode != 200){
          wx.showModal({
            title: '提交失败',
            content: '',
            showCancel: false,
            complete: (res) => {
              
          
              if (res.confirm) {
                return valid
              }
            }
          })
          return
        }
        wx.showModal({
          title: '您孩子的情况，我们已经收到。',
          content: '',
          showCancel: false,
          complete: (res) => {
          
            that.setData({status: 2})
        
            if (res.confirm) {
              return valid
            }
          }
        })
      }
      
    })
  },




  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    app.loginPromise.then(function (resolve){

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