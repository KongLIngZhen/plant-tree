import axios from 'axios';
import { Component } from "react"
import { message } from 'antd';

const base = '/api';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

// 请求前拦截
axios.interceptors.request.use(
  config => {
      return config;
  }, 
  err => {
    message.error('出现错误：' + err);
    return Promise.reject(err);
  }
)

// 请求后拦截
axios.interceptors.response.use(
    data => {
        return data;
    },
    err => {
        Object.keys(codeMessage).forEach((val) => {
            if(err.response.status === val) {
                console.log('response:' + codeMessage[val]);
            }
        })
        return Promise.reject(err);
    }
)

// @requestBody请求
const post = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8"
        }
    });
}

// @RequsetParam请求
const postRequestParam = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        transformRequest: [
            function(data) {
                let ret = "";
                for (let it in data) {
                    ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

// @get请求
const get = url => {
    return axios({
        method: "get",
        url: `${base}${url}`
    })
}

// @多个请求
const multiple = function(requestArray, callback) {
    axios.all(requestArray).then(axios.spread(callback));
}

Component.prototype.$get = get;
Component.prototype.$post = post;
Component.prototype.$postRequestParam = postRequestParam;
Component.prototype.$multiple = multiple;