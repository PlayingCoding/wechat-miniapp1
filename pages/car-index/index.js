//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.getCarList()
  },

  getCarList() {
    app.globalData.$api({
      url: `/Car/categoryList`,
      success: (res) => {
        this.setData({
          list: Array.isArray(res.data) ? res.data : []
        })
      }
    });
  },

  handleTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/car-list/index?id=${id}`
    })
  }
})
