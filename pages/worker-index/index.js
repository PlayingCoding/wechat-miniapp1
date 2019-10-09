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
    wx.navigateTo({
      url: `/pages/worker-list/index?id=${id}`
    })
  }
})
