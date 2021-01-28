<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-left"><img src="@/icons/img/logoLeft.png"></div>
      <el-form
        :model="loginForm"
        class="login-formBox"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <div class="title"><img src="@/icons/img/lvshihome.png"></div>
        </div>
        <el-form-item style="margin-bottom: 20px">
          <span class="svg-container">
            <!--            <svg-icon icon-class="user" />-->
            <img src="@/icons/img/dept.png">
          </span>
          <el-select
            v-model="loginForm.dwbm"
            placeholder="请选择"
            style="width: 92%"
          >
            <el-option
              value="2"
              label="检察官登录"
            />
             <el-option
              value="1"
              label="律师登录"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="username" style="margin-bottom: 20px">
          <span class="svg-container">
          
            <img src="@/icons/img/user.png">
          </span>
          <el-select
            ref="selectUpResId"
            v-model="loginForm.rybm"
            placeholder="请选择"
            style="width: 92%"
          >
            <el-option
              :key="rybm"
              :value="rybm"
              :label="Name"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item style="margin-bottom: 20px">
          <el-input
            v-model="loginForm.number"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px">
          <el-input
            v-model="loginForm.password"
            show-password
            placeholder="密码"
          />
        </el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:-30px;"
          round
          @click="handleLogin"
        >登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { number } from 'echarts/lib/export'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        password: '',
        number: '',
        dwbm: '',
      },
      dwbm: '',
      zhinnegkongshenlvshicaidan: [
  {
    path: '/',
    redirect: './login',
    component: 'Login'
  },
  {
    path: '/redirect',
    component: 'Layout',
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
    component: 'Layout',
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
      ],
      zhinnegkongshenjianchaguancaidan: [
  {
    path: '/',
    redirect: './login',
    component: 'Login'
  },
  {
    path: '/redirect',
    component: 'Layout',
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
    component: 'Layout',
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
      ],
    }
  },
  mounted() {
  },
  methods: {
    handleLogin() {
      if (this.loginForm.dwbm == '1') {
        localStorage.setItem('zhinnegkongshenrouters', true)
        this.$router.push({
          path: '/znla/home'
        })
      }else {
        localStorage.setItem('zhinnegkongshenrouters', false)
        this.$router.push({
          path: '/znsonga/infoList'
        })
      }
      for (var k in this.loginForm) {
        if (this.loginForm[k] == '') {
          this.$message.error('账号或密码错误，请确认后再次输入')
          return false
        }
      }
      this.$api.postLogin({
        userType: this.loginForm.dwbm,
        mobile: this.loginForm.number,
        password: this.loginForm.password
      })
        .then(res => {
          console.log(res)
          if (res.code === 0) {
            sessionStorage.setItem('kongshentoken',res.data.accessToken)
            localStorage.setItem('danweiName', res.data.procuratorateName)
            localStorage.setItem('danweiID', res.data.procuratorateId)
            localStorage.setItem('jianchaguanName', res.data.realName)
            if (this.loginForm.dwbm == '1') {
              localStorage.setItem('zhinnegkongshenrouters', true)
              this.$router.push({
                path: '/znla/home'
              })
            }else {
              localStorage.setItem('zhinnegkongshenrouters', false)
              this.$router.push({
                path: '/znsonga/infoList'
              })
            }
          }else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #8FA4BF;
$cursor: #8FA4BF;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    /*height: 47px;*/
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      /*height: 47px;*/
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #BDD2E6;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.el-form-item--medium .el-form-item__content{
    line-height: 36px;
}
.el-input--medium.el-input--suffix{
    width: 95%;
}
.login-container {
  min-height: 100%;
  width: 100%;
  //background-color: $bg;
  background: url("../../icons/img/logoBtn.png") no-repeat;
  background-size: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 830px;
    height: 532px;
    max-width: 100%;
    padding:15px;
    margin: 0 auto;
    margin-top: 100px;
    background: url("../../icons/img/logoDiv.png") no-repeat;
    background-size: 100%;
    overflow: hidden;
      .login-left{
          width: 348px;
          position: absolute;
          padding-left: 10px;
          margin-top: 8px;
         img{
             width: 100%;
             height: 100%;
         }
      }
      .login-formBox{
          margin-left: 385px;
          width: 378px;
      }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding:0 8px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    float: left;
    margin-top: 5px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      height: 66px;
      margin-top: 55px;
        img{
            height: 100%;
        }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
