import { $get, $post } from './axios-util'

// select查询
export function getCode(params) {
  return $get('/common/getCodehList?dmbh=' + params)
}
// 审查委托查询页面
export function scwtPageList(params) {
  return $post('/jcjd/scwtPageList', params)
}
// 文件上传
export function upload(params) {
  return $post('/jcjd/upload', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除文件
export function delFile(params) {
  return $post('/jcjd/delFile', params)
}
// 编辑添加审查委托
export function editScwt(params) {
  return $post('/jcjd/editScwt', params)
}
// 删除审查委托
export function delScwtById(params) {
  return $post('/jcjd/delScwtById', params)
}
// 提交审查委托
export function tjScwtById(params) {
  return $post('/jcjd/tjScwtById', params)
}
// 查看审查委托
export function getScwtById(params) {
  return $post('/jcjd/getScwtById', params)
}
// 文件下载
export function downloadWj(params) {
  return $get('/jcjd/download?id=' + params)
}
// 获取分流或者协同部门
export function getFlDept(params) {
  return $post('/jcjd/getFlDept', params)
}
// 获取对应分流部门下的人员
export function getUserByDwbm(params) {
  return $post('/jcjd/getUserByDwbm', params)
}
// 添加案件分流
export function addAjfl(params) {
  return $post('/jcjd/addAjfl', params)
}
// 根据审查委托id获取操作日志信息
export function getCzrzByWtid(params) {
  return $post('/jcjd/getCzrzByWtid', params)
}
// 智能审查协同审查根据审查委托id获取对应信息
export function getScwtByIdToScXt(params) {
  return $post('/jcjd/getScwtByIdToScXt', params)
}
// 更新智能审查接收状态
export function updateAjflJszt(params) {
  return $post('/jcjd/updateAjflJszt', params)
}
// 协同审查是否接受协同
export function updateAjflXtzt(params) {
  return $post('/jcjd/updateAjflXtzt', params)
}
// 获取对应分流部门下的人员协同
export function getXtUserByDwbm(params) {
  return $post('/jcjd/getXtUserByDwbm', params)
}
// 选择协同人
export function selectXtr(params) {
  return $post('/jcjd/selectXtr', params)
}
// 查询鉴定法律法规指引列表
export function queryJdfvfg(params) {
  return $post('/zssy/queryJdfvfg', params)
}
// 编辑鉴定法律标准指引
export function updateJdfvbz(params) {
  return $post('/zssy/updateJdfvbz', params)
}
// 删除鉴定法律标准指引
export function delJdbzzy(params) {
  return $get('/zssy/delJdbzzy?id=' + params)
}
// 查询详情鉴定法律标准指引通过id
export function queryByidjdbz(params) {
  return $get('/zssy/queryByidjdbz?id=' + params)
}
// 新增鉴定法律标准指引
export function insertJdfvbz(params) {
  return $post('/zssy/insertJdfvbz', params)
}
// 查询鉴定案例库列表
export function queryJdalk(params) {
  return $post('/zssy/queryJdalk', params)
}
// 查询详情鉴定案例库通过id
export function queryByidjdal(params) {
  return $get('/zssy/queryByidjdal?id=' + params)
}
// 删除详情鉴定案例库通过id
export function delJdalk(params) {
  return $get('/zssy/delJdalk?id=' + params)
}
// 新增鉴定案例库
export function insertJdalk(params) {
  return $post('/zssy/insertJdalk', params)
}
// 编辑鉴定案例库
export function updateJdalk(params) {
  return $post('/zssy/updateJdalk', params)
}
// 查询专家精释列表
export function queryZjjs(params) {
  return $post('/zssy/queryZjjs', params)
}
// 删除详情鉴定案例库通过id
export function delZjjs(params) {
  return $get('/zssy/delZjjs?id=' + params)
}
// 查询详情鉴定案例库通过id
export function queryByidzjjs(params) {
  return $get('/zssy/queryByidzjjs?id=' + params)
}
// 查询详情鉴定案例库通过id
export function insertZjjsxx(params) {
  return $post('/zssy/insertZjjsxx', params)
}
// 编辑详情鉴定案例库通过id
export function updateZjjs(params) {
  return $post('/zssy/updateZjjs', params)
}
// 查询医学专题库列表
export function queryYxztk(params) {
  return $post('/zssy/queryYxztk', params)
}
// 删除医学库通过id
export function delYxzt(params) {
  return $get('/zssy/delYxzt?id=' + params)
}
// 查询医学库通过id
export function queryByidyxzt(params) {
  return $get('/zssy/queryByidyxzt?id=' + params)
}
// 新增医学科
export function insertYxztxx(params) {
  return $post('/zssy/insertYxztxx', params)
}
// 编辑医学科
export function updateYxztxx(params) {
  return $post('/zssy/updateYxztxx', params)
}
// 查询审查人员信息列表
export function queryScrylist(params) {
  return $post('/scry/queryScrylist', params)
}
// 编辑审查人员信息
export function updateScryxx(params) {
  return $post('/scry/updateScryxx', params)
}
// 删除审查人员信息
export function delScryxx(params) {
  return $get('/scry/delScryxx?rybh=' + params)
}
// 查询id审查人员信息
export function queryScrybybh(params) {
  return $get('/scry/queryScrybybh?rybh=' + params)
}
// 新增审查人员信息列表
export function insertScry(params) {
  return $post('/scry/insertScry', params)
}
// 查询出资源库使用情况统计
export function queryZyksyqk(params) {
  return $post('/zssy/queryZyksyqk', params)
}
// 查询出资源调用分析
export function queryZydyfx(params) {
  return $post('/zssy/queryZydyfx', params)
}
// 委托饼状图数据
export function getWtCount(params) {
  return $post('/jcjd/getWtCount', params)
}
// /委托分类统计地图
export function getWtflCount(params) {
  return $post('/jcjd/getWtflCount', params)
}
// 期限预警分析
export function getQxyjfxCount(params) {
  return $post('/jcjd/getQxyjfxCount', params)
}
// 委托分流统计
export function getFlCount(params) {
  return $post('/jcjd/getFlCount', params)
}
// 委委托分类统计列表
export function getWtListCountFl(params) {
  return $post('/jcjd/getWtListCountFl', params)
}
export default {
  getCode,
  scwtPageList,
  editScwt,
  delScwtById,
  tjScwtById,
  getScwtById,
  downloadWj,
  getFlDept,
  getUserByDwbm,
  addAjfl,
  getCzrzByWtid,
  getScwtByIdToScXt,
  updateAjflJszt,
  updateAjflXtzt,
  upload,
  delFile,
  getXtUserByDwbm,
  selectXtr,
  queryJdfvfg,
  updateJdfvbz,
  delJdbzzy,
  queryByidjdbz,
  insertJdfvbz,
  queryJdalk,
  queryByidjdal,
  delJdalk,
  insertJdalk,
  updateJdalk,
  queryZjjs,
  delZjjs,
  queryByidzjjs,
  insertZjjsxx,
  updateZjjs,
  queryYxztk,
  delYxzt,
  queryByidyxzt,
  insertYxztxx,
  updateYxztxx,
  queryScrylist,
  updateScryxx,
  delScryxx,
  queryScrybybh,
  insertScry,
  queryZyksyqk,
  queryZydyfx,
  getWtCount,
  getWtflCount,
  getQxyjfxCount,
  getFlCount,
  getWtListCountFl
}
