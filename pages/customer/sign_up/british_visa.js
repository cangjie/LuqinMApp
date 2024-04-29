// pages/customer/sign_up/british_visa.js
Page({

  /**
   * Page initial data
   */
  data: {
    status: 0,

    
    cityList:[{"name":"==请选择城市==", "id":"0"},{"name":"北京", "id":"0"},{"name":"长沙", "id":"1"},{"name": "成都", "id": "2"},{"name":"重庆", "id": "3"},
      {"name": "福州", "id": "4"},{"name":"广州", "id": "5"},{"name":"杭州", "id": "6"},{"name":"济南", "id": "7"},
      {"name": "昆明", "id": "8"},{"name":"南京", "id": "9"},{"name":"上海", "id": "10"},{"name":"沈阳", "id": "11"},
      {"name":"深圳", "id": "12"},{"name":"武汉", "id": "13"},{"name":"西安", "id": "14"}],
    name: '',
    citySelectedIndex: 0,
    memo:''
  },

  setMemo(e){
    var that = this
    var value = e.detail.value
    that.setData({memo: value})
  },

  setName(e){
    var that = this
    var value = e.detail.value
    that.setData({name: value})
  },

  selectCity(e){
    var that = this
    var value = e.detail.value
    that.setData({citySelectedIndex: value})
  },

  save(){
    var msg = ''
    var that = this
    if (that.data.name == ''){
      msg = '请填写孩子姓名。'
    }
    else if (that.data.citySelectedIndex == 0 || that.data.citySelectedIndex >= that.data.cityList.length){
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
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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