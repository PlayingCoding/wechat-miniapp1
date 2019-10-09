//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    noticeList: []
  },

  onLoad: function () {
    this.getNoticeList()
  },

  bindGetUserInfo(dataObj) {
    const dataDetail = dataObj.detail

    if (dataDetail.userInfo) {
      wx.login({
        success: function (res) {
          if (res.code) {
            app.globalData.$api({
              url: '/Login/wxappLogin',
              data: {
                code: res.code,
                rawData: dataDetail.rawData,
                signature: dataDetail.signature,
                encryptedData: dataDetail.encryptedData,
                iv: dataDetail.iv,
              },
              success: ({ data }) => {
                // if (data.code === "validation") {
                //   wx.showToast({
                //     title: data.message,
                //     icon: "none",
                //     duration: 2000
                //   });
                // } else if (Array.isArray(data.data)) {
                //   this.setData({
                //     repos: data.data.map(repo => {
                //       if (repo.public === 0) {
                //         return {
                //           ...repo,
                //           name: `${repo.name} 🔒`
                //         }
                //       }
                //       return repo
                //     })
                //   });
                // }

                wx.setStorageSync('userinfo', {
                  id: res.data.id,
                  nickName: info.detail.userInfo.nickName,
                  avatarUrl: info.detail.userInfo.avatarUrl
                });    
              }
            });
          } else {
            wx.showToast({
              title: '授权失败',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: function() {
          wx.showToast({
            title: '登录失败',
            icon: 'error',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'error',
        duration: 2000
      })
    }
  },

  getNoticeList() {
    app.globalData.$api({
      url: '/Message/noticeList',
      success: ({ data }) => {
        console.log(data)
      }
    })
  }
})
