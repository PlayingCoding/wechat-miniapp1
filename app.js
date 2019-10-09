//app.js
const $api = require('/utils/api');

App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    $api: $api
  }
})