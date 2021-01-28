import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import zhajglRouter from './zhajgl'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: Login
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/znla',
    name: 'znla',
    redirect: '/znla/home',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/zhajgl/znla/home/index'),
        meta: { title: '首页', icon: 'iconfont' },
      },
    ]
  },
  {
    path: '/wlzxhome',
    name: 'wlzxhome',
    redirect: '/wlzxhome/wlzx',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'wlzx',
        name: 'wlzx',
        component: () => import('@/views/zhajgl/znla/wlzx/index'),
        meta: { title: '网络咨询', icon: 'iconfont' },
      },
      {
        path: 'wlzxxq/:id/:length',
        name: 'wlzxxq',
        component: () => import('@/views/zhajgl/znla/wlzxxq/index'),
        meta: { title: '网络咨询详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    path: '/wljfhome',
    name: 'wljfhome',
    redirect: '/wljfhome/wljf',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'wljf',
        name: 'wljf',
        component: () => import('@/views/zhajgl/znla/wljf/index'),
        meta: { title: '网络接访', icon: 'iconfont' },
      },
      {
        path: 'wljfxq/:id',
        name: 'wljfxq',
        component: () => import('@/views/zhajgl/znla/wljfxq/index'),
        meta: { title: '网络接访详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    path: '/ckjfhome',
    name: 'ckjfhome',
    redirect: '/ckjfhome/ckjf',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'ckjf',
        name: 'ckjf',
        component: () => import('@/views/zhajgl/znla/ckjf/index'),
        meta: { title: '预约窗口接访', icon: 'iconfont' },
      },
      {
        path: 'ckjfxq/:id/:state',
        name: 'ckjfxq',
        component: () => import('@/views/zhajgl/znla/ckjfxq/index'),
        meta: { title: '预约窗口接访详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    path: '/sfssajhome',
    name: 'sfssajhome',
    redirect: '/sfssajhome/ajdjb',
    component: Layout,
    meta: { title: '涉访涉诉案件化解', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'ajdjb',
            name: 'ajdjb',
            component: () => import('@/views/zhajgl/znla/sfssaj/ajdjb/index'),
            meta: { title: '登记列表', icon: 'iconfont' },
          },
          {
            path: 'hjxq/:id',
            name: 'hjxq',
            component: () => import('@/views/zhajgl/znla/sfssaj/hjxq/index'),
            meta: { title: '详情', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'tjdj',
            name: 'tjdj',
            component: () => import('@/views/zhajgl/znla/sfssaj/tjdj/index'),
            meta: { title: '添加登记', icon: 'iconfont' },
          },
    ]
  },
  {
    path: '/xfgztjfxhome',
    name: 'xfgztjfxhome',
    redirect: '/xfgztjfxhome/xfgztjfx',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'xfgztjfx',
        name: 'xfgztjfx',
        component: () => import('@/views/zhajgl/znla/xfgztjfx/index'),
        meta: { title: '信访工作统计分析', icon: 'iconfont' },
      },
    ]
  },
  {
    path: '/xxplhome',
    name: 'xxplhome',
    redirect: '/xxplhome/gzzd',
    component: Layout,
    meta: { title: '信息披露', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'gzzd',
            name: 'gzzd',
            component: () => import('@/views/zhajgl/znla/xxpl/gzzd/index'),
            meta: { title: '工作制度', icon: 'iconfont' },
          },
          {
            path: 'gzzdxq/:id',
            name: 'gzzdxq',
            component: () => import('@/views/zhajgl/znla/xxpl/gzzdxq/index'),
            meta: { title: '工作制度详情', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'lvsjbg',
            name: 'lvsjbg',
            component: () => import('@/views/zhajgl/znla/xxpl/lvsjbg/index'),
            meta: { title: '律师数据报告', icon: 'iconfont' },
          },
          {
            path: 'lsbgxq/:id',
            name: 'lsbgxq',
            component: () => import('@/views/zhajgl/znla/xxpl/lsbgxq/index'),
            meta: { title: '律师数据报告详情', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'yxalzs',
            name: 'yxalzs',
            component: () => import('@/views/zhajgl/znla/xxpl/yxalzs/index'),
            meta: { title: '优秀案例展示', icon: 'iconfont' },
          },
          {
            path: 'yxalzsxq/:id',
            name: 'yxalzsxq',
            component: () => import('@/views/zhajgl/znla/xxpl/yxalzsxq/index'),
            meta: { title: '优秀案例展示详情', icon: 'iconfont' },
            hidden: true
          },
    ]
  },
  /////////////////////////////////////////////////////
  {
    name: 'znsonga',
    path: '/znsonga',
    redirect: '/znsonga/infoList',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'infoList',
        name: 'infoList',
        component: () => import('@/views/zhajgl/znsonga/infoList/index'),
        meta: { title: '首页', icon: 'iconfont' },
      },
    ]
  },
  {
    name: 'lszykhome',
    path: '/lszykhome',
    redirect: '/lszykhome/lszyk',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'lszyk',
        name: 'lszyk',
        component: () => import('@/views/zhajgl/znsonga/lszyk/index'),
        meta: { title: '律师资源库', icon: 'iconfont' },
      },
      {
        path: 'watch/:id',
        name: 'watch',
        component: () => import('@/views/zhajgl/znsonga/watch/index'),
        meta: { title: '律师查看', icon: 'iconfont' },
        hidden: true
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/zhajgl/znsonga/add/index'),
        meta: { title: '添加律师', icon: 'iconfont' },
        hidden: true
      },
      {
        path: 'change/:id',
        name: 'change',
        component: () => import('@/views/zhajgl/znsonga/change/index'),
        meta: { title: '律师修改', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'jcwlzxhome',
    path: '/jcwlzxhome',
    redirect: '/jcwlzxhome/jcwlzx',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'jcwlzx',
        name: 'jcwlzx',
        component: () => import('@/views/zhajgl/znsonga/jcwlzx/index'),
        meta: { title: '网络咨询', icon: 'iconfont' },
      },
      {
        path: 'jcwlzxxq/:id',
        name: 'jcwlzxxq',
        component: () => import('@/views/zhajgl/znsonga/jcwlzxxq/index'),
        meta: { title: '网络咨询详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'jcwljfhome',
    path: '/jcwljfhome',
    redirect: '/jcwljfhome/jcwljf',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'jcwljf',
        name: 'jcwljf',
        component: () => import('@/views/zhajgl/znsonga/jcwljf/index'),
        meta: { title: '网络接访', icon: 'iconfont' },
      },
      {
        path: 'jcwljfxq/:id',
        name: 'jcwljfxq',
        component: () => import('@/views/zhajgl/znsonga/jcwljfxq/index'),
        meta: { title: '网络接访详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'jcyyckjfhome',
    path: '/jcyyckjfhome',
    redirect: '/jcyyckjfhome/jcyyckjf',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'jcyyckjf',
        name: 'jcyyckjf',
        component: () => import('@/views/zhajgl/znsonga/jcyyckjf/index'),
        meta: { title: '预约窗口接访', icon: 'iconfont' },
      },
      {
        path: 'jcyyckjfxq/:id',
        name: 'jcyyckjfxq',
        component: () => import('@/views/zhajgl/znsonga/jcyyckjfxq/index'),
        meta: { title: '预约窗口详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'ajhjgzhome',
    path: '/ajhjgzhome',
    redirect: '/ajhjgzhome/ajhjgz',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'ajhjgz',
        name: 'ajhjgz',
        component: () => import('@/views/zhajgl/znsonga/ajhjgz/index'),
        meta: { title: '网络参与化解工作', icon: 'iconfont' },
      },
      {
        path: 'ajhjgzxq/:id',
        name: 'ajhjgzxq',
        component: () => import('@/views/zhajgl/znsonga/ajhjgzxq/index'),
        meta: { title: '查看详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'tjfxhome',
    path: '/tjfxhome',
    redirect: '/tjfxhome/tjfx',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'tjfx',
        name: 'tjfx',
        component: () => import('@/views/zhajgl/znsonga/tjfx/index'),
        meta: { title: '信访工作统计分析', icon: 'iconfont' },
      },
    ]
  },
  {
    name: 'xxgxhome',
    path: '/xxgxhome',
    redirect: '/xxgxhome/jsjl',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'jsjl',
            name: 'jsjl',
            component: () => import('@/views/zhajgl/znsonga/xxgx/jsjl/index'),
            meta: { title: '接收记录', icon: 'iconfont' },
          },
          {
            path: 'rizhi',
            name: 'rizhi',
            component: () => import('@/views/zhajgl/znsonga/xxgx/rizhi/index'),
            meta: { title: '日志', icon: 'iconfont' },
          },
        ]
  },
  {
    name: 'jcxxplhome',
    path: '/jcxxplhome',
    redirect: '/jcxxplhome/xxfb',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'xxfb',
            name: 'xxfb',
            component: () => import('@/views/zhajgl/znsonga/xxpl/xxfb/index'),
            meta: { title: '信息发布', icon: 'iconfont' },
          },
          {
            path: 'xxtj',
            name: 'xxtj',
            component: () => import('@/views/zhajgl/znsonga/xxpl/xxtj/index'),
            meta: { title: '添加信息', icon: 'iconfont' },
          },
          {
            path: 'xiugai/:id',
            name: 'xiugai',
            component: () => import('@/views/zhajgl/znsonga/xxpl/change/index'),
            meta: { title: '信息修改', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'chakan/:id',
            name: 'chakan',
            component: () => import('@/views/zhajgl/znsonga/xxpl/chakan/index'),
            meta: { title: '信息预览', icon: 'iconfont' },
            hidden: true
          },
        ]
  },
]

// 检察官
export const jianchaguanRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: Login
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/znla',
    name: 'znla',
    redirect: 'znla/home',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/zhajgl/znla/home/index'),
        meta: { title: '首页', icon: 'iconfont' },
      },
    ]
  },
  {
    path: '/wlzxhome',
    name: 'wlzxhome',
    redirect: 'wlzxhome/wlzx',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'wlzx',
        name: 'wlzx',
        component: () => import('@/views/zhajgl/znla/wlzx/index'),
        meta: { title: '网络咨询', icon: 'iconfont' },
      },
      {
        path: 'wlzxxq/:id/:length',
        name: 'wlzxxq',
        component: () => import('@/views/zhajgl/znla/wlzxxq/index'),
        meta: { title: '网络咨询详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    path: '/wljfhome',
    name: 'wljfhome',
    redirect: 'wljfhome/wljf',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'wljf',
        name: 'wljf',
        component: () => import('@/views/zhajgl/znla/wljf/index'),
        meta: { title: '网络接访', icon: 'iconfont' },
      },
      {
        path: 'wljfxq/:id',
        name: 'wljfxq',
        component: () => import('@/views/zhajgl/znla/wljfxq/index'),
        meta: { title: '网络接访详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    path: '/ckjfhome',
    name: 'ckjfhome',
    redirect: 'ckjfhome/ckjf',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'ckjf',
        name: 'ckjf',
        component: () => import('@/views/zhajgl/znla/ckjf/index'),
        meta: { title: '预约窗口接访', icon: 'iconfont' },
      },
      {
        path: 'ckjfxq/:id/:state',
        name: 'ckjfxq',
        component: () => import('@/views/zhajgl/znla/ckjfxq/index'),
        meta: { title: '预约窗口接访详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    path: '/sfssajhome',
    name: 'sfssajhome',
    redirect: 'sfssajhome/sfssaj',
    component: Layout,
    meta: { title: '涉访涉诉案件化解', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'ajdjb',
            name: 'ajdjb',
            component: () => import('@/views/zhajgl/znla/sfssaj/ajdjb/index'),
            meta: { title: '登记列表', icon: 'iconfont' },
          },
          {
            path: 'hjxq/:id',
            name: 'hjxq',
            component: () => import('@/views/zhajgl/znla/sfssaj/hjxq/index'),
            meta: { title: '详情', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'tjdj',
            name: 'tjdj',
            component: () => import('@/views/zhajgl/znla/sfssaj/tjdj/index'),
            meta: { title: '添加登记', icon: 'iconfont' },
          },
    ]
  },
  {
    path: '/xfgztjfxhome',
    name: 'xfgztjfxhome',
    redirect: 'xfgztjfxhome/xfgztjfx',
    component: Layout,
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'xfgztjfx',
        name: 'xfgztjfx',
        component: () => import('@/views/zhajgl/znla/xfgztjfx/index'),
        meta: { title: '信访工作统计分析', icon: 'iconfont' },
      },
    ]
  },
  {
    path: '/xxplhome',
    name: 'xxplhome',
    redirect: 'xxplhome/xxpl',
    component: Layout,
    meta: { title: '信息披露', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'xxpl',
        name: 'xxpl',
        component: () => import('@/views/zhajgl/znla/xxpl/index'),
        meta: { title: '信息披露', icon: 'iconfont' },
            path: 'gzzd',
            name: 'gzzd',
            component: () => import('@/views/zhajgl/znla/xxpl/gzzd/index'),
            meta: { title: '工作制度', icon: 'iconfont' },
          },
          {
            path: 'gzzdxq/:id',
            name: 'gzzdxq',
            component: () => import('@/views/zhajgl/znla/xxpl/gzzdxq/index'),
            meta: { title: '工作制度详情', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'lvsjbg',
            name: 'lvsjbg',
            component: () => import('@/views/zhajgl/znla/xxpl/lvsjbg/index'),
            meta: { title: '律师数据报告', icon: 'iconfont' },
          },
          {
            path: 'lsbgxq/:id',
            name: 'lsbgxq',
            component: () => import('@/views/zhajgl/znla/xxpl/lsbgxq/index'),
            meta: { title: '律师数据报告详情', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'yxalzs',
            name: 'yxalzs',
            component: () => import('@/views/zhajgl/znla/xxpl/yxalzs/index'),
            meta: { title: '优秀案例展示', icon: 'iconfont' },
          },
          {
            path: 'yxalzsxq/:id',
            name: 'yxalzsxq',
            component: () => import('@/views/zhajgl/znla/xxpl/yxalzsxq/index'),
            meta: { title: '优秀案例展示详情', icon: 'iconfont' },
            hidden: true
          },
        ]   
  },
]

// 律师
export const lvshiRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: Login
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    name: 'znsonga',
    path: '/znsonga',
    redirect: 'znsonga/infoList',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'infoList',
        name: 'infoList',
        component: () => import('@/views/zhajgl/znsonga/infoList/index'),
        meta: { title: '首页', icon: 'iconfont' },
      },
    ]
  },
  {
    name: 'lszykhome',
    path: '/lszykhome',
    redirect: 'lszykhome/lszyk',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'lszyk',
        name: 'lszyk',
        component: () => import('@/views/zhajgl/znsonga/lszyk/index'),
        meta: { title: '律师资源库', icon: 'iconfont' },
      },
      {
        path: 'watch/:id',
        name: 'watch',
        component: () => import('@/views/zhajgl/znsonga/watch/index'),
        meta: { title: '律师查看', icon: 'iconfont' },
        hidden: true
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/zhajgl/znsonga/add/index'),
        meta: { title: '添加律师', icon: 'iconfont' },
        hidden: true
      },
      {
        path: 'change/:id',
        name: 'change',
        component: () => import('@/views/zhajgl/znsonga/change/index'),
        meta: { title: '律师修改', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'jcwlzxhome',
    path: '/jcwlzxhome',
    redirect: 'jcwlzxhome/jcwlzx',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'jcwlzx',
        name: 'jcwlzx',
        component: () => import('@/views/zhajgl/znsonga/jcwlzx/index'),
        meta: { title: '网络咨询', icon: 'iconfont' },
      },
      {
        path: 'jcwlzxxq/:id',
        name: 'jcwlzxxq',
        component: () => import('@/views/zhajgl/znsonga/jcwlzxxq/index'),
        meta: { title: '网络咨询详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'jcwljfhome',
    path: '/jcwljfhome',
    redirect: 'jcwljfhome/jcwljf',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'jcwljf',
        name: 'jcwljf',
        component: () => import('@/views/zhajgl/znsonga/jcwljf/index'),
        meta: { title: '网络接访', icon: 'iconfont' },
      },
      {
        path: 'jcwljfxq/:id',
        name: 'jcwljfxq',
        component: () => import('@/views/zhajgl/znsonga/jcwljfxq/index'),
        meta: { title: '网络接访详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'jcyyckjfhome',
    path: '/jcyyckjfhome',
    redirect: 'jcyyckjfhome/jcyyckjf',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'jcyyckjf',
        name: 'jcyyckjf',
        component: () => import('@/views/zhajgl/znsonga/jcyyckjf/index'),
        meta: { title: '预约窗口接访', icon: 'iconfont' },
      },
      {
        path: 'jcyyckjfxq/:id',
        name: 'jcyyckjfxq',
        component: () => import('@/views/zhajgl/znsonga/jcyyckjfxq/index'),
        meta: { title: '预约窗口详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'ajhjgzhome',
    path: '/ajhjgzhome',
    redirect: 'ajhjgzhome/ajhjgz',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'ajhjgz',
        name: 'ajhjgz',
        component: () => import('@/views/zhajgl/znsonga/ajhjgz/index'),
        meta: { title: '网络参与化解工作', icon: 'iconfont' },
      },
      {
        path: 'ajhjgzxq/:id',
        name: 'ajhjgzxq',
        component: () => import('@/views/zhajgl/znsonga/ajhjgzxq/index'),
        meta: { title: '查看详情', icon: 'iconfont' },
        hidden: true
      },
    ]
  },
  {
    name: 'tjfxhome',
    path: '/tjfxhome',
    redirect: 'tjfxhome/tjfx',
    component: Layout,
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'tjfx',
        name: 'tjfx',
        component: () => import('@/views/zhajgl/znsonga/tjfx/index'),
        meta: { title: '信访工作统计分析', icon: 'iconfont' },
      },
    ]
  },
  {
    name: 'xxgxhome',
    path: '/xxgxhome',
    redirect: 'xxgxhome/jsjl',
    component: Layout,
    meta: { title: '信息共享', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'jsjl',
            name: 'jsjl',
            component: () => import('@/views/zhajgl/znsonga/xxgx/jsjl/index'),
            meta: { title: '接收记录', icon: 'iconfont' },
          },
          {
            path: 'rizhi',
            name: 'rizhi',
            component: () => import('@/views/zhajgl/znsonga/xxgx/rizhi/index'),
            meta: { title: '日志', icon: 'iconfont' },
          },
    ]
  },
  {
    name: 'jcxxplhome',
    path: '/jcxxplhome',
    redirect: 'jcxxplhome/xxfb',
    component: Layout,
    meta: { title: '信息披露', icon: 'iconfont icon-dian' },
    children: [
          {
            path: 'xxfb',
            name: 'xxfb',
            component: () => import('@/views/zhajgl/znsonga/xxpl/xxfb/index'),
            meta: { title: '信息发布', icon: 'iconfont' },
          },
          {
            path: 'xxtj',
            name: 'xxtj',
            component: () => import('@/views/zhajgl/znsonga/xxpl/xxtj/index'),
            meta: { title: '添加信息', icon: 'iconfont' },
          },
          {
            path: 'xiugai/:id',
            name: 'xiugai',
            component: () => import('@/views/zhajgl/znsonga/xxpl/change/index'),
            meta: { title: '信息修改', icon: 'iconfont' },
            hidden: true
          },
          {
            path: 'chakan/:id',
            name: 'chakan',
            component: () => import('@/views/zhajgl/znsonga/xxpl/chakan/index'),
            meta: { title: '信息预览', icon: 'iconfont' },
            hidden: true
          },
        ]
  },
]

export const asyncRoutes = [
]
// export const asyncRoutes = [
//   {
//     path: '/calSupervise',
//     name: 'calSupervise',
//     component: Layout,
//     redirect: '/calSupervise/create',
//     meta: { title: '图书管理', icon: 'el-icon-folder-opened', roles: ['admin', 'editor'] },
//     children: [
//       {
//         name: 'bookCreate',
//         path: '/book/create',
//         component: () => import('@/views/book/create'),
//         meta: { title: '上传图书', icon: 'icon-dian', roles: ['admin'] }
//       },
//       {
//         name: 'bookEdit',
//         path: '/book/edit/:fileName',
//         component: () => import('@/views/book/edit'),
//         hidden: true,
//         meta: { title: '编辑图书', icon: 'edit', roles: ['admin', 'editor'], activeMenu: '/book/list' }
//       },
//       {
//         name: 'bookList',
//         path: '/book/list',
//         component: () => import('@/views/book/list'),
//         meta: { title: '图书列表', icon: 'list', roles: ['admin', 'editor'] }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})


const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
