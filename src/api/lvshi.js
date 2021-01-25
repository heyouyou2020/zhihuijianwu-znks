import { $get, $post, $put } from './axios-util'
export function postLogin(params) {
  return $post('/authority/login', params)
}
export function postLoginOut(params) {
  return $post('/authority/logout', params)
}
export function getTongJi(params) {
  return $get('/lawyer/home/yearOnYear', params)
}
export function getWldaiban(params) {
  return $get('/lawyer/home/todo', params)
}
export function getHomegonggao(params) {
  return $get('/lawyer/info/home', params)
}
export function getHomemessage(params) {
  return $get('/lawyer/info/' +  params)
}
export function getWlzixunList(params) {
  return $get('/lawyer/consulting/list', params)
}
export function getWlzixunneirong(params) {
  return $get('/lawyer/consulting/detail/' +  params)
} 
export function getWlzixunHuifu(id, params) {
  return $put('/lawyer/consulting/' + id, params)
}
export function getWljiefangList(params) {
  return $get('/lawyer/interview/list', params)
}
export function getWljiefangxq(params) {
  return $get('/lawyer/interview/detail/' + params)
}
export function getWljiefangliaotian(params) {
  return $get('/lawyer/interview/exchange/' + params)
}
export function getWljiefangchange(params) {
  return $put('/lawyer/interview/' + params)
}
export function getWljiefangsendinfo(id, params) {
  return $post('/lawyer/interview/exchange/' + id, params)
}
export function getchuangkouList(params) {
  return $get('/lawyer/windowsInterview/list', params)
}
export function getchuangkoubiaoge(params) {
  return $get('/lawyer/windowsInterview/detail/' + params)
}
export function getchuangkouchange(params) {
  return $put('/lawyer/windowsInterview/' + params)
}
export function getwlhuajie(params) {
  return $get('/lawyer/melt/list' , params)
}
export function getwlhuajieXQ(params) {
  return $get('/lawyer/melt/' + params)
}
export function getwlhuajieadd(params) {
  return $post('/lawyer/melt' , params)
}
export function getlvtongjishuju(params) {
  return $get('/lawyer/analysis/yearOnYear' , params)
}
export function getlvshiwlzx(params) {
  return $get('/lawyer/analysis/consulting' , params)
}
export function getlvshiwljf(params) {
  return $get('/lawyer/analysis/interview' , params)
}
export function getlvshiHuaJie(params) {
  return $get('/lawyer/analysis/melt' , params)
}
export function getlvshichuangkou(params) {
  return $get('/lawyer/analysis/windowsInterview' , params)
}
export function getlvshiwrok(params) {
  return $get('/lawyer/info/work' , params)
}
export function getlvshibaogao(params) {
  return $get('/lawyer/info/report' , params)
}
export function getlvshianlizhanshi(params) {
  return $get('/lawyer/info/case' , params)
}
export default {
  postLoginOut,
  getwlhuajieXQ,
  getTongJi,
  getlvshiHuaJie,
  postLogin,
  getWldaiban,
  getHomegonggao,
  getHomemessage,
  getWlzixunList,
  getWlzixunneirong,
  getWlzixunHuifu,
  getWljiefangList,
  getWljiefangxq,
  getWljiefangliaotian,
  getWljiefangchange,
  getWljiefangsendinfo,
  getchuangkouList,
  getchuangkoubiaoge,
  getchuangkouchange,
  getwlhuajie,
  getwlhuajieadd,
  getlvtongjishuju,
  getlvshiwlzx,
  getlvshiwljf,
  getlvshichuangkou,
  getlvshiwrok,
  getlvshibaogao,
  getlvshianlizhanshi
}
