import { $get } from './axios-util'

// 查询-检察官档案
export function getDAList(params) {
  return $get('/zhjw/archive/list/inquisitorInfo', params)
}
// 查询-司法档案年度以及名称
export function getYearList() {
  return $get('/zhjw/archive/archivesyearname')
}
// 查询-所有部门
export function getDept(params) {
  return $get('/zhjw/zhla/list/dept?dwbm=' + params)
}
// 查询-检察官
export function getInquisitor(params) {
  return $get('/zhjw/archive/list/inquisitor', params)
}
export default {
  getDAList,
  getYearList,
  getDept,
  getInquisitor
}
