import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import router from '../router'

const $axios = (options) => {
  return new Promise((resolve, reject) => {
    // 默认配置 axios 实例
    const instance = axios.create({
      baseURL: process.env.VUE_APP_BASE_API, // 默认请求 ip
      headers: { // 默认 json 请求
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // timeout: process.env.VUE_APP_Timeout, // 请求时间
      paramsSerializer(params) { // 序列化函数
        return qs.stringify(params)
      }
    })
    // 请求配置
    instance.interceptors.request.use(config => {
      if (sessionStorage.getItem('kongshentoken')) {
        config.headers.accessToken = sessionStorage.getItem('kongshentoken')
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应配置
    instance.interceptors.response.use(response => {
      let resData
      // console.log(response)
      if (response.data === undefined) {
        resData = JSON.parse(response.request.responseText)
      } else {
        resData = response.data
      }
      if (resData.code) {
        if (resData.code == 1000) {
          console.log('登录过期')
          window.location.href = "/login"
        }
      }
      return resData
    }, error => {
      // console.log(error)
      if (error && error.response) {
        // 根据业务写具体的报错信息
        switch (error.response.status) {
          case 400:
            error.response.data.message = '错误请求'
            break
        }
      }
      if (error.message) {
        // 错误提示弹框
        Message({
          message: error.message
        })
      }
      return Promise.reject(error.message)
    })
    // 请求处理
    instance(options).then((res) => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}

// 导出常用请求方法
export function $get(url, params) {
  return $axios({
    url: url,
    method: 'get',
    params
  })
}

export function $post(url, params) {
  return $axios({
    url: url,
    method: 'post',
    data: params
  })
}

export function $pput(url, params) {
  return $axios({
    url: url,
    method: 'put',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  })
}

export function $delete(url, params) {
  return $axios({
    url: url,
    method: 'delete',
    data: params
  })
}

export function $put(url, params) {
  return $axios({
    url: url,
    method: 'put',
    data: params,
  })
}

export function $up(url, params) {
  return $axios({
    url: url,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  })
}

export default $axios
