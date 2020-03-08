// 辅助函数，log
export const log = console.log.bind(console)

// 倒计时函数
// 传入秒数，返回剩余的时，分，秒
// endtime [Number]

export const getTimeArr = (endtime) => {
  let now = new Date().getTime()
  let resttime = (endtime - now) / 1000
  let h, m, s
  if (resttime > 0) {
    h = Math.floor(resttime / 60 / 60 % 24)
    m = Math.floor(resttime / 60 % 60)
    s = Math.floor(resttime % 60)

    h = h < 10 ? ('0' + h) : h
    m = m < 10 ? ('0' + m) : m
    s = s < 10 ? ('0' + s) : s
  } else {
    h = '00'
    m = '00'
    s = '00'
  }

  return [h, m, s]
}

// 判断三元素的数组是否都为‘00’
export const isZero = (arr) => {
  if (arr.length !== 3) {
    return 'error'
  } else if (arr[0] === '00' && arr[1] === '00' && arr[2] === '00') {
    return true
  } else {
    return false
  }
}

// 获取设备系统信息
export const getSystem = () => {
  let sys = {}
  wx.getSystemInfo({
    success: function (res) {
      sys.pixelRatio = res.pixelRatio
      sys.ww = res.windowWidth
      sys.wh = res.windowHeight
      sys.barh = res.statusBarHeight
    }
  })
  return sys
}

// 本地存储相关
export const SetItem = (key, value) => {
  wx.setStorageSync(key, value)
}

export const GetItem = (key) => {
  return wx.getStorageSync(key)
}

// 格式化日期
export function timestampToTime(timestamp) {
  var tempString = '' + timestamp
  if (tempString.length === 13) {
    timestamp = timestamp / 1000
  }
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num
  }
  var curTimestamp = parseInt(new Date().getTime() / 1000) // 当前时间戳
  var timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数
  var curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000)  // 参数时间戳转换成的日期对象
  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate()
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds()
  if (timestampDiff < 60) { // 一分钟以内
    return '刚刚'
  } else if (timestampDiff < 3600) { // 一小时之内
    return Math.floor(timestampDiff / 60) + '分钟前'
  } else if (timestampDiff / 3600 >= 1 && timestampDiff / 3600 < 24) { // 24小时前
    return Math.floor(timestampDiff / 3600) + '小时前'
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return '昨天' + zeroize(H) + ':' + zeroize(i)
    } else if (timestampDiff / 3600 / 24 <= 9) {
      return Math.floor(timestampDiff / 3600 / 24) + '天前'
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + '-' + zeroize(d)
    } else {
      return Y + '-' + zeroize(m) + '-' + zeroize(d)
    }
  }
}
