// pages/customer/registration/ctu_2301.js
Page({

  /**
   * Page initial data
   */
  data: {
    status: 0,
    submitData:{
      is_disease: 0,
      is_allergy: 0
    }
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