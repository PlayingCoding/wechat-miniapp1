//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    active: 2
  },

  onLoad: function () {
    this.getMessageList()
  },

  getMessageList() {
    app.globalData.$api({
      url: active === 1 ? '/Message/messageList' : '/Message/noticeList',
      data: {
        type: active === 1 ? 1 : ''
      },
      success: ({ data }) => {
        this.setData({
          list: Array.isArray(data) ? data : []
        })
      }
    })
  },

  readMessage(id) {
    const that = this

    app.globalData.$api({
      url: '/Message/messageRead',
      data: {
        id
      },
      success: ({ data }) => {
        that.getMessageList()
      }
    })
  },

  handleTab(e) {
    const { index } = e.currentTarget.dataset

    this.setData({
      active: parseInt(index)
    })
  }
})
