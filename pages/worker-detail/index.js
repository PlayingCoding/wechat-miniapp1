//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    detail: {},
    banners: []
  },

  onLoad: function (options) {
    this.getWorkerList(options.id)
  },

  getWorkerDetail(id) {
    app.globalData.$api({
      url: '/Worker/workerDetail',
      data: {
        id: id
      },
      success: ({ data }) => {
        const dataObj = data || {}

        this.setData({
          detail: data || {},
          banners: typeof dataObj.images === 'string' ? dataObj.images.split(',') : []
        })
      }
    })
  },
})
