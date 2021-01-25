<template>
  <div :class="classObj" class="app-wrapper">
    <!--    增加头部-->
    <el-header class="app-header">
      <span
        class="app-logOut"
        @click="logOut"
      ><img
        src="../icons/img/logOut.png"
        height="15"
        width="15"
      >注销系统</span>
      <span
        class="topLogo"
      ><img
        src="../icons/img/logo.png"
        height="28"
        width="28"
      ></span>
      <span>智慧检务工程系统</span>
      <!-- <span v-show="show" class="sa-message" @click="goInfoList">
        <i class="el-icon-chat-line-square" /> 未读消息(2)
      </span> -->
    </el-header>
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <!--        <tags-view v-if="needTagsView" />-->
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      show: true,
      menuList: []
    }
  },
  watch: {
    // 监听路由 未读消息的显示隐藏 mry
    $route(route) {
      if (route.path === '/zhajgl/znsonga/infoList') {
        this.show = false
      } else {
        this.show = true
      }
    }
  },
  created() {
    // 判断未读消息的显示隐藏 mry
    if (this.$route.path === '/zhajgl/znsonga/infoList') {
      this.show = false
    } else {
      this.show = true
    }
    // this.getMenuLlist()
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 跳转到消息列表
    goInfoList() {
      this.$router.push({
        path: '/zhajgl/znsonga/infoList'
      })
    },
    logOut() {
      this.$api.postLoginOut().then(res => {
        if (res.code === 0) {
          sessionStorage.removeItem('kongshentoken')
          localStorage.removeItem('danweiName')
          localStorage.removeItem('danweiID')
          localStorage.removeItem('jianchaguanName')
          localStorage.removeItem('zhinnegkongshenrouters')
          this.$message.success('登出成功')
          this.$router.push('/login')
        }else {
          this.$message.error('操作失败,请稍后再试')
        }
      })
    },
    // getMenuLlist() {
    //   this.$store.dispatch('user/getMenu').then((res) => {
    //     this.menuList = res.data
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #ecf1fa;
  .app-header {
    height: 49px !important;
    background-color: #2269d6;
    color: #fefefe;
    line-height: 49px;
    font-size: 18px;
    padding: 0 10px !important;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .app-logOut {
      position: absolute;
      right: 15px;
      top: 0;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      img {
        margin-top: 16px;
        margin-right: 5px;
        float: left;
      }
    }
    .topLogo {
      float: left;
      img {
        margin-top: 13px;
        margin-right: 5px;
      }
    }
    .sa-message {
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid #6d9ce4;
      font-size: 16px;
      cursor: pointer;
      i {
        font-size: 18px;
        vertical-align: middle;
      }
    }
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
