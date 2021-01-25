import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import './icons/render/iconfont.js'
import './icons/render/iconfont.css'

import '@/styles/index.scss' // global css
import Api from './api/index'
import App from './App'
import store from './store'
import router from './router'
import Echarts from 'echarts'
import Moment from 'moment'
import VueUeditorWrap from 'vue-ueditor-wrap'

import './icons' // icon
// import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.prototype.moment = Moment
Vue.prototype.$echarts = Echarts
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.use(Api)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
