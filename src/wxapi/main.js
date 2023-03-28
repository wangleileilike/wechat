// 小程序开发api接口工具包，https://github.com/gooking/wxapi
// const API_BASE_URL = 'http://h4iyqz.natappfree.cc'
// const API_BASE_URL = 'https://testm.10jqka.com.cn/znkf-wechat'
// const API_BASE_URL = 'https://robot.wewecall.com/znkf-wechat'
// const API_BASE_URL = 'https://vopoc.ths123.com/znkf-wechat'

// 三方平台的接口url
// const thirdparty_url =  'https://znkftest2.ths123.com'; // 测试环境(旧)
// const thirdparty_url = 'https://znkftest.wewecall.com:10081'; // 测试环境(新)
// const thirdparty_url =  'https://znkfdemo.wewecall.com:20080'; // 演示环境
const thirdparty_url =  'https://robot.wewecall.com'; // 正式环境
const thirdparty_url_api = "unified-service";
const userHost = 'user-service';
const callboxHost = 'callbox-service';
const taskHost = 'task-service';
const templateHost = 'template-service';
const statisHost = 'statistics-service';
const customerCenterHost = 'customer-center-service';
const fileHost = 'file-service';
const robotHost = 'robot-server';
const lineHost = 'line-service';

import { concatUrlParam } from '../utils/stringUtil';
import { stringify } from 'qs';

const request = (url, method, data, header, isQueryString) => {
  const baseUrl = thirdparty_url;
  let _url = baseUrl + "/" + url;
  if (isQueryString && method === 'GET' && data) {
    _url = concatUrlParam(_url, data);
    data = stringify(data, { arrayFormat: 'repeat' });
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': getAccessToken(),
        ...header
      },
      success(request) {
        resolve(request.data)
        if (request.data.code === 99) {
          console.info("授权已过时!", url)
        }
        if(request.header && request.header.access_token) {
          updataStorage(request.header.access_token)
        }
        handleStatusCode(request);
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

const requestJson = (url, method, data, header, isQueryString) => {
  const baseUrl = thirdparty_url;
  let _url = baseUrl + "/" + url;
  if (isQueryString && method === 'GET' && data) {
    _url = concatUrlParam(_url, data);
    data = stringify(data, { arrayFormat: 'repeat' });
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': getAccessToken(),
        ...header
      },
      success(request) {
        resolve(request.data)
        if (request.data.code === 99) {
          console.info("授权已过时!", url)
        }
        if(request.header && request.header.access_token) {
          updataStorage(request.header.access_token)
        }
        handleStatusCode(request);
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(
    function(value) {
      Promise.resolve(callback()).then(
        function() {
          return value;
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason;
        }
      );
    }
  );
}

export default {
  request,
  requestJson,
  thirdparty_url,
  thirdparty_url_api,
  fileHost,
  userHost,
  callboxHost,
  lineHost,
  templateHost,
  taskHost,
  statisHost,
  customerCenterHost,
  robotHost,
  // 校验是否登录
  isBind: (data) => {
    return request(`${userHost}/company/user/wechat/isBind`, 'post', data)
  },
  // 登录平台鉴权（以调用平台接口）
  login: data => requestJson('uum-server/tokens', 'post', data),
  // 退出登录（注销token）
  loginOut: data => request('uum-server/logout', 'post', data),
  // 获取用户信息
  getUserInfo: data => request(`${userHost}/company/user/userInfo`, 'get', data),

  // 获取首页数据
  getDailylist: data => request(`${statisHost}/statistics/robot/calldata/summary`, 'get', data),

  queryPlatformShowService: data => request(`${userHost}/company/product`, 'get', data),  // 删除gate接口改用改接口替代2022.6.13

  bind: (jscode, nickname, username, password) => {
    return request(`${userHost}/company/user/wechat/bind`, 'post', {
      jscode: jscode,
      nickname: nickname,
      username: username,
      password: password
    })
  },
  unbind: data => {
    return request(`${userHost}/company/user/wechat/unbind`, 'post', data)
  }

}

export function getAccessToken() {
  const accessInfo = wx.getStorageSync('callout-accessInfo');
  if (accessInfo) {
    const { token, tokenHead } = JSON.parse(accessInfo);
    return `${tokenHead}${token}`
  } else {
    return;
  }
}

export function setStorage(key, data, callback) {
  wx.setStorage({
    key: `callout-${key}`,
    data: JSON.stringify(data),
    success(res) {
      if(callback) {
        callback();
      }
    }
  })
}

export function updataStorage(access_token) {
  const accessInfo = wx.getStorageSync('callout-accessInfo');
  const { token, ...restValues } = JSON.parse(accessInfo);
  setStorage('accessInfo', { token: access_token, ...restValues })
}

export function getStorage(key, callback) {
  let value = null;

  if (callback) {
    wx.getStorage({
      key: `callout-${key}`,
      success (res) {
        try {
          value = JSON.parse(res.data);
        }catch(e){
          value = res.data;
        }
        callback(value);
      }
    })
  } else {
    try {
      let valStr = wx.getStorageSync(`callout-${key}`)
      if (valStr) {
        try {
          value = JSON.parse(valStr);
        }catch(e) {
          value = valStr;
        }
      }
    } catch (e) {
      // Do something when catch error
    }

    return value;
  }

}

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '接口不存在',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

function handleStatusCode(response) {
  if (response.statusCode !== 200 && response.statusCode !== 401) {
    wx.showToast({
      title: codeMessage[response.statusCode] || response.errMsg,
      image: '../static/images/error.png',
    })
  }
  if(response.statusCode === 401) {
    wx.reLaunch({
      url: '/pages/login'
    })
  }
}
