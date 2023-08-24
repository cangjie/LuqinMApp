// pages/customer/sign_up/health_announce.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    submitData:{
      name: '',
      disease: '无',
      depression_level: '',
      is_allergy: 0,
      allergy: '',
      other_diseases: '',
      use_drug: 0,
      drugs_memo: '',
      need_others_service: 0,
      service_memo: '',
      have_sport_disease: 0,
      sport_disease_memo: ''
    },
    diseaseDianxian: false,
    diseaseYiyuzheng: false,
    diseaseYunche: false,
    diseaseGaoxueya: false,
    diseaseXiaochuan: false,
    diseaseQita: false,
    status: 0,
    diseaseStrArr: []
  },
  setName(e){
    var that = this
    var submitData = that.data.submitData
    submitData.name = e.detail.value
    that.setData({submitData: submitData})
  },
  setDisease(e){
    console.log('set disease', e)
    var that = this
    var submitData = that.data.submitData
    var diseaseArr = e.detail.value
    that.setData({diseaseDianxian: false,
      diseaseYiyuzheng: false,
      diseaseGuomin: false,
      diseaseYunche: false,
      diseaseGaoxueya: false,
      diseaseXiaochuan: false,
      diseaseQita: false,
      diseaseQita: false})
    if (diseaseArr.length > 0){
      if (diseaseArr[diseaseArr.length - 1] == '无'){
        submitData.disease = '无'
        //var diseaseStrArr = ['无']
        //that.setData({diseaseStrArr: diseaseStrArr})
      }
      else{
        var disease = ''
        //var diseaseStrArr = []
        for(var i = 0; i < diseaseArr.length; i++){
          if (diseaseArr[i] != '无'){
            disease = disease + ((disease=='')?'':',') + diseaseArr[i]
          }
          switch(diseaseArr[i]){
            case '癫痫':
              that.setData({diseaseDianxian: true})
              //diseaseStrArr.push('癫痫')
              break
            case '抑郁症':
              that.setData({diseaseYiyuzheng: true})
              //diseaseStrArr.push('抑郁症')
              break
            
            case '晕车、晕机':
              that.setData({diseaseYunche: true})
              //diseaseStrArr.push('晕车、晕机')
              break
            case '高血压':
              that.setData({diseaseGaoxueya: true})
              //diseaseStrArr.push('高血压')
              break
            case '哮喘':
              that.setData({diseaseXiaochuan: true})
              //diseaseStrArr.push('哮喘')
              break
            case '其他':
              that.setData({diseaseQita: true})
              //diseaseStrArr.push('其他')
              break
            default:
              break
          }
        }
        submitData.disease = disease
        that.setData({submitData: submitData})
      }

    }
  },
  setRadio(e){
    console.log('set radio', e)
    var that = this
    var id = e.currentTarget.id
    var value = e.detail.value
    var submitData = that.data.submitData
    switch(id){
      case 'gender':
        submitData.gender = value
        break
      case 'drug':
        submitData.use_drug = parseInt(value)
        break
      case 'diet':
        submitData.special_diet = parseInt(value)
        break
      case 'service':
        submitData.need_others_service = parseInt(value)
        break
      case 'sportDisease':
        submitData.have_sport_disease = parseInt(value)
        break
      case 'depressionLevel':
        submitData.depression_level = value
        /*
        var diseaseStrArr = that.data.diseaseStrArr
        for(var i = 0; i < diseaseStrArr.length; i++){
          if (diseaseStrArr[i].indexOf('抑郁症') == 0){
            diseaseStrArr[i] = '抑郁症：' + value
            break
          }
        }
        
        that.setData({diseaseStrArr: diseaseStrArr})
        */
        break
      case 'allergy':
        submitData.is_allergy = parseInt(value)
        break
      default:
        break
    }
    that.setData({submitData: submitData})
  },
  setText(e){
    console.log('set radio', e)
    var that = this
    var id = e.currentTarget.id
    var value = e.detail.value
    var submitData = that.data.submitData
    switch(id){
      case 'txtGuomin':
        submitData.allergy = value
        break
      case 'txtQita':
        submitData.other_diseases = value
        /*
        var diseaseStrArr = that.data.diseaseStrArr
        for(var i = 0; i < diseaseStrArr.length; i++){
          if (diseaseStrArr[i].indexOf('其他') == 0){
            diseaseStrArr[i] = '其他：' + value
            break
          }
        }
        
        that.setData({diseaseStrArr: diseaseStrArr})
        */
        break
      case 'txtDrug':
        submitData.drugs_memo = value
        break
      case 'txtService':
        submitData.service_memo = value
        break
      case 'txtSportDisease':
        submitData.sport_disease_memo = value
        break
        case 'txtAllergy':
          submitData.allergy = value
          break
      default:
        break
    }
    that.setData({submitData: submitData})
  },
  checkValid(){
    var valid = true
    var msg = ''
    var that = this
    var submitData = that.data.submitData
    
    if (submitData.name == ''){
      msg = '请填写姓名.'
      valid = false
    }
    else if (submitData.disease.indexOf('抑郁症') >= 0 && submitData.depression_level == ''){
      msg = '请选择抑郁症程度.'
      valid = false
    }
    else if (submitData.disease.indexOf('其他') >= 0 && submitData.other_diseases == ''){
      msg = '请填写其他的情况。'
      valid = false
    }
    else if (submitData.is_allergy != 0 && submitData.allergy == ''){
      msg = '请详细说明您孩子对什么过敏。'
      valid = false
    }
    else if (submitData.use_drug != 0 && submitData.drugs_memo == ''){
      msg = '请详细说明您孩子的病情及所用药物。'
      valid = false
    }
    else if (submitData.need_others_service != 0 && submitData.service_memo == ''){
      msg = '请详细说明您孩子需要什么特殊的医疗照顾。'
      valid = false
    }
    else if (submitData.have_sport_disease != 0 && submitData.sport_disease_memo == ''){
      msg = '请详细说明您孩子与户外活动相关的疾病史和注意事项。'
      valid = false
    }
    if (valid){
      var diseaseStr = submitData.disease
      diseaseStr = diseaseStr.replace('抑郁症', '抑郁症：'+ submitData.depression_level)
      diseaseStr = diseaseStr.replace('其他', '其他：'+ submitData.other_diseases)
      that.setData({diseaseStr: diseaseStr})
      return true
    }
    wx.showModal({
      title: msg,
      content: '',
      showCancel: false,
      complete: (res) => {
        
    
        if (res.confirm) {
          return valid
        }
      }
    })
    
    //else if (submitData.disease.indexOf(''))
    return valid
  },
  save(){
    var that = this
    if (that.checkValid()){
      that.setData({status: 1})
    }
    
  },
  mod(){
    this.setData({status: 0})
  },
  submit(){
    var that = this
    var submitData = that.data.submitData
    var submitUrl = app.globalData.requestPrefix + 'Health/PostHealth'
    wx.request({
      url: submitUrl,
      method: 'POST',
      data: submitData,
      success:(res)=>{
        console.log(res)
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