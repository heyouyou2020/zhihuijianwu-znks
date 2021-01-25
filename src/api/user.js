// import request from '@/utils/request'
import { $post } from './axios-util'

// 获取单位列表
export function getDwList(params) {
  return $post('/user/getDwList', params)
}
// 登录验证接口
export function login(params) {
  return $post('/user/login', params)
}
// 获取用户菜单
export function getUserMenuList(params) {
  return $post('/user/getUserMenuList', params)
}

export default {
  getDwList,
  login,
  getUserMenuList,
}
