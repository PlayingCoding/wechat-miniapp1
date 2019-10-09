// 响应返回码以及对应信息
const response_code_msg = {
  400: '请求的参数不正确，或缺少必要信息',
  401: '需要用户认证的接口用户信息不正确',
  403: '缺少对应功能的权限',
  404: '数据不存在，或未开放',
  500: '服务器异常',
}

const baseUrl = 'http://paidan.xjkss.com/api'
const md5 = require('./md5')

const $api = apiParams => {
  wx.showLoading()
  const { method = 'POST', header, url, data = {} } = apiParams

  try {
    const storageUserInfo = wx.getStorageInfoSync()
    data['user_id'] = storageUserInfo.userId || ''
    data['token'] = storageUserInfo.accessToken || ''
  } catch (error) {
    data['user_id'] = ''
    data['token'] = ''
  }

  const dataStr = JSON.stringify(data)
  const requestData = {
    data: dataStr
  }

  requestData.apisign = md5(`e871d9b4e1447acfeff49cc58ec3cf6d${dataStr}`)

  // 请求 header
  let customerHeader = {}

  if(['POST', 'PUT'].includes(method)) {
    customerHeader = {
      ...header,
      ...customerHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  
  return wx.request({
    ...apiParams,
    method: method,
    data: requestData,
    url: baseUrl + url,
    header: customerHeader,
    success (res) {
      const resData = res.data

      if (resData.status === 0) {
        wx.showToast({
          title: '请求处理失败！',
          icon: 'none',
          duration: 2000
        })
      } else if (resData.status === -1) {
        wx.showToast({
          title: '未登录或登录过期！',
          icon: 'none',
          duration: 2000
        })

        // wx.switchTab({
        //   url: '/pages/index/index'
        // })
      } else {
        apiParams.success(resData)
      }
    },
    fail ({ data: { status } }) {
      wx.showToast({
        title: response_code_msg[status],
        icon: 'none',
        duration: 2000
      })
    },
    complete({ data: { status } }) {
      wx.hideLoading()
      const responseMsg = response_code_msg[status]

      if(typeof responseMsg !== 'undefined') {
        wx.showToast({
          title: responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
}

module.exports = $api