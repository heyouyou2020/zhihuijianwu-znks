import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
let accessRoutes = []
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  /* z注释 start */
  if (accessRoutes.length === 0) {
    accessRoutes = await store.dispatch('permission/generateRoutes', [])
    router.addRoutes(accessRoutes)
  }
  next()
  /* z注释 end*/
  // const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //  /* z注释 start */
  //  /*替换新的逻辑，当前路由和返回的menulist递归对比，看是否存在menulist中，若存在则继续，不存在则跳到404或登录*/
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       try {
  //         const { roles } = await store.dispatch('user/getInfo')
  //         const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  //         router.addRoutes(accessRoutes)
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   /* z注释 end*/
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
