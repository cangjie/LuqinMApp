// pages/customer/registration/ctu_2301.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * Page initial data
   */
  data: {
    status: 0,
    /*
    submitData:{
      child_name: '苍杰',
      child_age: '45',
      child_gender: '男',
      region: '北京市/北京市/朝阳区',
      child_length: '190',
      child_weight: '100',
      child_id_no: '110101197802093018',
      contact_pri_name: '于娜',
      contact_pri_cell: '18601197897',
      contact_sec_name: '李悦',
      contact_sec_cell: '18501097897',
      is_disease: 0,
      child_disease: '癫痫，晕车，艾滋病',
      is_allergy: 0,
      child_allergy: '茴香'
    }
    */
   submitData:{
    camp_name: 'ctu_2401'
   }
  },

  back(){
    wx.navigateBack()
  },


  input(e){
    console.log('input', e)
    var inputValue = ''
    var oriValue = e.detail.value
    var id = e.currentTarget.id
    var that = this
    var submitData = that.data.submitData
    switch(id){
      case 'child_name':
        submitData.child_name = oriValue
        break
      case 'child_gender':
        submitData.child_gender = oriValue
        break
      case 'child_age':
        submitData.child_age = oriValue
        break
      case 'child_length':
        submitData.child_length = oriValue
        break
      case 'child_weight':
        submitData.child_weight = oriValue
        break
      case 'child_id_no':
        submitData.child_id_no = oriValue
        break
      case 'contact_pri_name':
        submitData.contact_pri_name = oriValue
        break
      case 'contact_pri_cell':
        submitData.contact_pri_cell = oriValue
        break
      case 'contact_sec_name':
        submitData.contact_sec_name = oriValue
        break
      case 'contact_sec_cell':
        submitData.contact_sec_cell = oriValue
        break
      case 'region':
        for(var i = 0; i < 3; i++){
          inputValue += oriValue[i] + ((i < 2)?'/':'')
        }
        submitData.region = inputValue
        break;
      case 'is_disease':
        submitData.is_disease = oriValue
        break
      case 'is_allergy':
        submitData.is_allergy = oriValue
        break
      case 'child_allergy':
        submitData.child_allergy = oriValue
        break
      case 'child_disease':
        submitData.child_disease = oriValue
        break
      default:
        break
    }
    that.setData({submitData: submitData})
  },

  checkValid(){
    //var valid = true
    var message = ''
    var that = this
    var submitData = that.data.submitData
    if (util.isBlank(submitData.child_name)){
      message = '请填写孩子的姓名。'
    }
    else if (util.isBlank(submitData.child_gender)){
      message = '请选择孩子的性别。'
    }
    else if (util.isBlank(submitData.child_age)){
      message = '请填写孩子的年龄。'
    }
    else if (util.isBlank(submitData.region)){
      message = '请选择您所在的省市。'
    }
    else if (util.isBlank(submitData.child_length)){
      message = '请填写孩子的身高。'
    }
    else if (util.isBlank(submitData.child_weight)){
      message = '请填写孩子的体重。'
    }
    else if (util.isBlank(submitData.child_id_no)){
      message = '请填写孩子的身份证号码。'
    }
    else if (submitData.is_disease == 1 && util.isBlank(submitData.child_disease)){
      message = '请告知孩子有何种疾病。'
    }
    else if (submitData.is_allergy == 1 && util.isBlank(submitData.child_allergy)){
      message = '请说明孩子对什么过敏。'
    }
    else if (util.isBlank(submitData.contact_pri_name)){
      message = '请填写首选联系人姓名。'
    }
    else if (util.isBlank(submitData.contact_pri_cell) || submitData.contact_pri_cell.length != 11){
      message = '请正确填写首选联系人电话。'
    }
    else if (util.isBlank(submitData.contact_sec_name)){
      message = '请填写备用联系人姓名。'
    }
    else if (util.isBlank(submitData.contact_sec_cell) || submitData.contact_sec_cell.length != 11){
      message = '请正确填写备用联系人电话。'
    }
    else {
      return true
    }
    wx.showToast({
      title: message,
      icon: 'none'
    })
    return false
  },
  save(){
    var that = this
    var valid = that.checkValid()
    if (!valid){
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
    var submitData = that.data.submitData
    submitData.camp_name = 'ctu_2401'
    var postUrl = app.globalData.requestPrefix + 'CampRegistration/NewRegister?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
    var msg = '您的报名表我们已经收到。'
    if (that.data.id != undefined && !isNaN(that.data.id)){
      postUrl = app.globalData.requestPrefix + 'CampRegistration/ModRegister?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
      msg = '您的报名表变更已经保存。'
    }
    wx.request({
      url: postUrl,
      method: 'POST',
      data: submitData,
      success:(res)=>{
        if (res.statusCode != 200){
          return
        }
        console.log('add new', res)
        /*
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 4000,
          mask: true
          
          
        })
        */
       wx.showModal({
         title: msg,
         content: '',
         showCancel: false,
         complete: (res) => {
           if (res.cancel) {
             
           }
       
           if (res.confirm) {
            wx.navigateTo({
              url: 'ctu_2401_list',
            })
           }
         }
       })
        
      }
    })
  },

  init(){
    var that = this
    var getUrl = app.globalData.requestPrefix + 'CampRegistration/GetRegistration/' + that.data.id + '?sessionKey=' + encodeURIComponent(app.globalData.sessionKey)
    wx.request({
      url: getUrl,
      method: 'GET',
      success:(res)=>{
        console.log('camp reg', res)
        if (res.statusCode != 200){
          return
        }
        var submitData = res.data
        if (util.isBlank(submitData.child_allergy)){
          submitData.is_allergy = 0
        }
        else{
          submitData.is_allergy = 1
        }
        if (util.isBlank(submitData.child_disease)){
          submitData.is_disease = 0
        }
        else{
          submitData.is_disease = 1
        }
        that.setData({submitData: submitData})
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this
    
    app.loginPromise.then(function(resolve){
      console.log('session key', app.globalData.sessionKey)
      if (options.id != undefined && options.id != null && !isNaN(options.id)){
        that.setData({id: options.id})
        that.init()
      }

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