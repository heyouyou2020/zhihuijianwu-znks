import { $get, $post } from './axios-util'
// 类案推送
export function getNMatchCase(params) {
  return $post('/caseElements/getNMatchCase', params)
}
// 侦查情况查询列表
export function queryZcqk(params) {
  return $get('/lazcsp/queryZcqk', params)
}
// 风险预警查询列表（立案监督、侦查活动监督）
export function queryFxyj(params) {
  return $get('/lazcsp/queryLazcFxyj', params)
}
// 侦查情况列表
export function queryXsinfo(params) {
  return $post('/lazcsp/queryXsinfo', params)
}
// 删除线索信息
export function delXsxx(params) {
  return $post('/lazcsp/delXsxx', params)
}
// 查询线索详情
export function queryXsxq(params) {
  return $get('/lazcsp/queryXsxxbybh?xsbh=' + params)
}
// 审查线索详情
export function queryXsScxq(params) {
  return $get('/lazcsp/queryXsScbybh?xsbh=' + params)
}
// 保存线索信息
export function saveXsxq(params) {
  return $post('/lazcsp/saveXsxx', params)
}
// 转为事项线索信息
export function updateXsinfo(params) {
  return $post('/lazcsp/updateXsinfo', params)
}
// 转为备查线索信息
export function updateXswfba(params) {
  return $post('/lazcsp/updateXswfba', params)
}
// 转为违法索信息
export function updateXszwf(params) {
  return $post('/lazcsp/updateXszwf', params)
}
// 线索范围信息
export function queryXsfw(params) {
  return $get('/lazcsp/queryXsfw', params)
}
// 查询违法事项code
export function queryWfsx(params) {
  return $get('/lazcsp/queryWfsx', params)
}
// 查询研判预测
export function queryYpyc(params) {
  return $post('/lazcsp/queryYpyc', params)
}
// 查询研判预测的开始日期
export function getYpycKsrq(params) {
  return $get('/lazcsp/getYpycKsrq?lb=' + params)
}
// 立案情况列表
export function queryLaqk(params) {
  return $get('/lazcsp/queryLaqk', params)
}
// 审判情况列表
export function querySpqk(params) {
  return $get('/lazcsp/querySpqk', params)
}
// 审判情况风险预警查询
export function querySphdFxyj(params) {
  return $get('/lazcsp/querySphdFxyj?yjdj=' + params)
}
// 审判情况风险类型查询
export function querySphdwfsx(params) {
  return $get('/lazcsp/querySphdwfsx', params)
}
// 审判情况风险预警列表
export function queryFxgllist(params) {
  return $post('/lazcsp/queryFxgllist', params)
}
// 审判情况新增风险预警
export function saveYjxx(params) {
  return $post('/lazcsp/saveYjxx', params)
}
// 审判情况编辑id查询风险预警
export function queryFxyjbyid(params) {
  return $get('/lazcsp/queryFxyjbyid?id=' + params)
}
// 审判情况编辑风险预警
export function updateFxgl(params) {
  return $post('/lazcsp/updateFxgl', params)
}
// 审判情况删除风险预警
export function delFxgl(params) {
  return $post('/lazcsp/delFxgl', params)
}
// 批量删除风险
export function delAllxsxx(params) {
  return $post('/lazcsp/delAllxsxx', params)
}
// 相关案件列表
export function getAjxx(params) {
  return $post('/ajxx/getAjxx', params)
}
// 法律依据列表
export function queryFlyj(params) {
  return $post('/lazcsp/queryFxfg', params)
}
// 通过id查询法律法规
export function queryFvxxbyid(params) {
  return $get('/lazcsp/queryFvxxbyid?id=' + params)
}
// 办案指引
export function queryBazy(params) {
  return $get('/lazcsp/queryBazyxx?lb=' + params)
}
// 案件信息图谱
export function queryAjxxtp(params) {
  return $post('/ajxx/detailMap', params)
}
export default {
  getNMatchCase,
  queryZcqk,
  queryFxyj,
  queryXsinfo,
  queryXsxq,
  saveXsxq,
  delXsxx,
  updateXsinfo,
  updateXswfba,
  updateXszwf,
  queryXsfw,
  queryWfsx,
  queryYpyc,
  queryLaqk,
  querySpqk,
  getAjxx,
  queryFlyj,
  queryBazy,
  queryXsScxq,
  querySphdFxyj,
  queryFxgllist,
  delAllxsxx,
  querySphdwfsx,
  saveYjxx,
  updateFxgl,
  queryFxyjbyid,
  delFxgl,
  getYpycKsrq,
  queryFvxxbyid

}
