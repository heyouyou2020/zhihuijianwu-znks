/**
 * 智能受理案件模块路由
 */
const routers = [
  {
    path: 'znla',
    name: 'znla',
    redirect: 'znla/home',
    component: () => import('@/views/zhajgl/znla/index'),
    meta: { title: '律师管理', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/zhajgl/znla/home/index'),
        meta: { title: '首页', icon: 'iconfont' },
      },
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
        meta: { title: '网络咨询详情', icon: 'iconfont' },
        hidden: true
      },
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
      {
        path: 'sfssaj',
        name: 'sfssaj',
        component: () => import('@/views/zhajgl/znla/sfssaj/index'),
        meta: { title: '涉访涉诉案件化解', icon: 'iconfont' },
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
        ],
      },
      {
        path: 'xfgztjfx',
        name: 'xfgztjfx',
        component: () => import('@/views/zhajgl/znla/xfgztjfx/index'),
        meta: { title: '信访工作统计分析', icon: 'iconfont' },
      },
      {
        path: 'xxpl',
        name: 'xxpl',
        component: () => import('@/views/zhajgl/znla/xxpl/index'),
        meta: { title: '信息披露', icon: 'iconfont' },
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
      // {
      //   path: 'ajlb',
      //   name: 'ajlb',
      //   component: () => import('@/views/zhajgl/znla/ajlb/index'),
      //   meta: { title: '案件列表', icon: 'iconfont' },
      // },
    ]
  },
  {
    name: 'znsonga',
    path: 'znsonga',
    redirect: 'znsonga/infoList',
    component: () => import('@/views/zhajgl/znsonga/index'),
    meta: { title: '检察官', icon: 'iconfont icon-dian' },
    children: [
      {
        path: 'infoList',
        name: 'infoList',
        component: () => import('@/views/zhajgl/znsonga/infoList/index'),
        meta: { title: '首页', icon: 'iconfont' },
      },
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
      {
        path: 'tjfx',
        name: 'tjfx',
        component: () => import('@/views/zhajgl/znsonga/tjfx/index'),
        meta: { title: '信访工作统计分析', icon: 'iconfont' },
      },
      {
        path: 'xxgx',
        name: 'xxgx',
        component: () => import('@/views/zhajgl/znsonga/xxgx/index'),
        meta: { title: '信息共享', icon: 'iconfont' },
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
        path: 'xxpl',
        name: 'xxpl',
        component: () => import('@/views/zhajgl/znsonga/xxpl/index'),
        meta: { title: '信息披露', icon: 'iconfont' },
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
  },
]
export default routers

