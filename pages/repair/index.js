//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.getRepairList()
  },

  getRepairList() {
    app.globalData.$api({
      url: `/Repair/categoryList`,
      success: (res) => {
        this.setData({
          list: Array.isArray(res.data) ? res.data : []
        })
      }
    });
  }
})
