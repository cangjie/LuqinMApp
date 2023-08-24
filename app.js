// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    
  },
  
  globalData: {
    requestPrefix: 'https://mini.luqinwenda.com/api/',
    userInfo: null,
    sessionKey: '',
    userTabBar:{
      "custom": true,
      "color": "#000000",
      "selectedColor": "#FF0000",
      "backgroundColor": "#000000",
      "list": [
      /*
      {
        "pagePath": "/pages/customer/index/index",
        "text": "文章"
      }, 
      */
      {
        "pagePath": "/pages/customer/question/question_submit",
        "text": "问题"
      }, 
      {
        "pagePath": "/pages/customer/mine/mine_index",
        "text": "我的"
      }]
    }
  },
  loginPromise: new Promise(function(resolve){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var app = getApp()
        console.log("Login info:", res)
        var loginUrl = app.globalData.requestPrefix + 'MiniAppHelper/Login/' + encodeURIComponent(res.code)
        wx.request({
          url: loginUrl,
          method: 'get',
          success:(res)=>{
            console.log("Login api info:", res)
            app.globalData.sessionKey = res.data.sessionKey
            app.globalData.userInfo = {}
            app.globalData.userInfo.user_id = res.data.user_id
            app.globalData.original_id = res.data.original_id
            resolve({sessionKey: res.data.sessionKey})
          }
        })
      }
    })
  })
})
