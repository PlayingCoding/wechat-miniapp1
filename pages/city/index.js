let City = require('../../utils/allcity.js');

const app = getApp()

Page({
  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true // 是否开启标题吸顶
    }
  },
  onLoad() {
    this.setData({
      city: City
    })
  },

  bindtap(e) {
    console.log(e.detail)
  },
})
