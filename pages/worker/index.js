//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.getWorkerList()
  },

  getWorkerList() {
    app.globalData.$api({
      url: `/Worker/categoryList`,
      success: (res) => {
        this.setData({
          list: Array.isArray(res.data) ? res.data : []
        })
      }
    });
  },

  handleTap(e) {
    const { id } = e.currentTarget.dataset
    wx.redirectTo({
      url: '/pages/worker-list/index?id=1'
    })
  }
})
