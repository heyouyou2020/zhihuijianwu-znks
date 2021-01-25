import user from './user'
import xsjcjd from './xsjcjd' // 智慧刑事检查
import zhscjd from './zhscjd' // 智慧审查鉴定
import znlagl from './znlagl' // 智能轮案
import lvshi from './lvshi' //律师
import ajfxyp from './ajfxyp' // 案件分析研判
import sfda from './sfda' // 司法档案
export const serviceApi = {
  ...user,
  ...xsjcjd,
  ...zhscjd,
  ...znlagl,
  ...lvshi,
  ...ajfxyp,
  ...sfda
}
const install = Vue => {
  if (install.installed) {
    return
  }
  install.installed = true
  Vue.prototype.$api = serviceApi
}

export default install
