import { $get, $post, $put, $up, $pput, $delete } from './axios-util'
export function getjianchanHome(params) {
  return $get('/prosecutor/home/todo', params)
}
export function getjianchantongji(params) {
  return $get('/prosecutor/home/yearOnYear', params)
}
export function getjianchanlvshi(params) {
  return $get('/prosecutor/lawyer/list', params)
}
export function getjianchanlvshixq(params) {
  return $get('/prosecutor/lawyer/'+ params)
}
export function getjianchanlvshnum(params) {
  return $get('/prosecutor/lawyer/validation/mobile/'+ params)
}

// 查询检察院列表
export function getjianchanyuanLIst(params) {
  return $get('/prosecutor/procuratorate/list', params)
}
export function getjianchanyuanChildren(params) {
  return $get('/prosecutor/procuratorate/children/' + params)
}
export function getjianchanlvshsfz(params) {
  return $get('/prosecutor/lawyer/validation/idcardNum/'+ params)
}
export function getjianchanlvshcard(params) {
  return $get('/prosecutor/lawyer/validation/professionNum/'+ params)
}
export function sousuowlzixun(params) {
  return $get('/prosecutor/consulting/list', params)
}
export function sousuowlzixunxq(params) {
  return $get('/prosecutor/consulting/detail/' +  params)
}
export function sousuowChuangkouYuYueJieFang(params) {
  return $get('/prosecutor/windowsInterview/list', params)
}
export function gongxiangwlzixun(params) {
  return $post('/prosecutor/share/consulting', params)
}
export function gongxiangwljf(params) {
  return $post('/prosecutor/share/interview', params)
}
export function sousuowljf(params) {
  return $get('/prosecutor/interview/list', params)
}
export function wljfxq(params) {
  return $get('/prosecutor/interview/detail/' + params)
}
export function wljfchartxq(params) {
  return $get('/prosecutor/interview/exchange/' + params)
}
export function gongxiangwlck(params) {
  return $post('/prosecutor/share/windowsInterview', params)
}
export function wljfsousuo(params) {
  return $get('/prosecutor/windowsInterview/list' , params)
}
export function chuangkouxq(params) {
  return $get('/prosecutor/windowsInterview/detail/' + params)
}
export function gongxianghuajie(params) {
  return $post('/prosecutor/share/melt', params)
}
export function chuangkousousuo(params) {
  return $get('/prosecutor/melt/list', params)
}
export function huajiexq(params) {
  return $get('/prosecutor/melt/' + params)
}
export function huajietongji(params) {
  return $get('/prosecutor/analysis/melt', params)
}
export function chuangkoutongji(params) {
  return $get('/prosecutor/analysis/windowsInterview', params)
}
export function wlzixuntongji(params) {
  return $get('/prosecutor/analysis/consulting', params)
}
export function wljiefangtongji(params) {
  return $get('/prosecutor/analysis/interview', params)
}
export function dingbuangtongji(params) {
  return $get('/prosecutor/analysis/yearOnYear', params)
}
export function gxsousuowlzixun(params) {
  return $get('/prosecutor/share/consulting/list', params)
}
export function gxsousuowljiefang(params) {
  return $get('/prosecutor/share/interview/list', params)
}
export function gxsousuowlck(params) {
  return $get('/prosecutor/share/windowsInterview/list', params)
}
export function gxsousuowlhuajie(params) {
  return $get('/prosecutor/share/melt/list', params)
}
export function jieshouhuajie(id,params) {
  return $put('/prosecutor/share/melt/' + id, params)
}
export function jieshouchuangkou(id,params) {
  return $put('/prosecutor/share/windowsInterview/' + id, params)
}
export function jieshouwlzixun(id,params) {
  return $put('/prosecutor/share/consulting/' + id, params)
}
export function jieshouwljiefang(id,params) {
  return $put('/prosecutor/share/interview/' + id, params)
}
export function uploadlvhsi(params) {
  return $up('/prosecutor/lawyer', params)
}
export function Rzwazixun(params) {
  return $get('/prosecutor/shareLog/consulting/list', params)
}
export function Rzwajiefang(params) {
  return $get('/prosecutor/shareLog/interview/list', params)
}
export function Rzwachuangkou(params) {
  return $get('/prosecutor/shareLog/windowsInterview/list', params)
}
export function Rzwahuajie(params) {
  return $get('/prosecutor/shareLog/melt/list', params)
}
export function getgonggao(params) {
  return $get('/prosecutor/info/list/all', params)
}
export function baocun(params) {
  return $post('/prosecutor/info/draft', params)
}
export function xiugai(id,params) {
  return $put('/prosecutor/info/' + id, params)
}
export function chanchu(params) {
  return $delete('/prosecutor/info/' + params)
}
export function send(params) {
  return $post('/prosecutor/info', params)
}
export function chakan(params) {
  return $get('/prosecutor/info/' + params)
}
export function getzhibiao(params) {
  return $get('/prosecutor/info/yearOnYear' , params)
}

// 修改律师
export function changLvShiZiLiao(id, params) {
  return $pput('/prosecutor/lawyer/' + id, params)
}
// 检察官顶部数据
export function getJianChaGuanTj(params) {
  return $get('/prosecutor/home/yearOnYear', params)
}
// 网络咨询
export function getJianChaGuanWLZX(params) {
  return $get('/prosecutor/analysis/consulting', params)
}
// 网络接访
export function getJianChaGuanWLJF(params) {
  return $get('/prosecutor/analysis/interview', params)
}
// ckjf
export function getJianChaGuanCKJF(params) {
  return $get('/prosecutor/analysis/windowsInterview', params)
}
// 涉访涉诉
export function getJianChaGuanSFSS(params) {
  return $get('/prosecutor/analysis/melt', params)
}
export default {
  getJianChaGuanTj,
  getJianChaGuanWLZX,
  getJianChaGuanWLJF,
  getJianChaGuanCKJF,
  getJianChaGuanSFSS,
  getjianchanyuanChildren,
  changLvShiZiLiao,
  getjianchanyuanLIst,
  getjianchanHome,
  getjianchantongji,
  getjianchanlvshi,
  getjianchanlvshixq,
  getjianchanlvshnum,
  getjianchanlvshsfz,
  getjianchanlvshcard,
  sousuowlzixun,
  sousuowlzixunxq,
  gongxiangwlzixun,
  gongxiangwljf,
  sousuowljf,
  wljfxq,
  wljfchartxq,
  gongxiangwlck,
  wljfsousuo,
  chuangkouxq,
  gongxianghuajie,
  chuangkousousuo,
  huajiexq,
  huajietongji,
  chuangkoutongji,
  wlzixuntongji,
  wljiefangtongji,
  dingbuangtongji,
  gxsousuowlzixun,
  gxsousuowljiefang,
  gxsousuowlck,
  gxsousuowlhuajie,
  jieshouhuajie,
  jieshouchuangkou,
  jieshouwlzixun,
  jieshouwljiefang,
  uploadlvhsi,
  Rzwazixun,
  Rzwajiefang,
  Rzwachuangkou,
  Rzwahuajie,
  getgonggao,
  baocun,
  xiugai,
  chanchu,
  send,
  chakan,
  getzhibiao,
  sousuowChuangkouYuYueJieFang
}
