//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad: function (options) {
    this.getWorkerList(options.id)
  },

  getWorkerList(categoryId) {
    app.globalData.$api({
      url: '/Car/carList',
      data: {
        category_id: categoryId
      },
      success: ({ data }) => {
        this.setData({
          list: Array.isArray(data) ? data : []
        })
      }
    })
  },

  handleTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/car-detail/index?id=${id}`
    })
  }
})
