//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  
  onLoad: function () {
    
  },

  bindGetUserInfo(res) {
    console.log(res);
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
      wx.login({
        success: function (res) {
          console.log(res);
        }
      })
    } else {
      console.log("点击了拒绝授权");
    }
  }
})
