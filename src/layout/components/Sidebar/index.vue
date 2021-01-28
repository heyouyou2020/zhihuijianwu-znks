<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--        :background-color="variables.menuBg"-->
        <sidebar-item
          v-for="route in routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserId } from '@/utils/auth'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { constantRoutes, lvshiRoutes, jianchaguanRoutes } from '@/router/index'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    // routers() {
    //   return jianchaguanRoutes
    //   // if (localStorage.getItem('zhinnegkongshenrouters')) {
    //   //   return lvshiRoutes
    //   // }
    //   // if (!localStorage.getItem('zhinnegkongshenrouters')) {
    //   //   return jianchaguanRoutes
    //   // }
    // },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      // return !this.sidebar.opened
      return false
    }
  },
  data() {
    return {
      routers: []
    }
  },
  created() {
    // this.routers = JSON.parse(localStorage.getItem('menuList'))
    // this.getMenuLlist()废弃
    if (localStorage.getItem('zhinnegkongshenrouters') == 'false') {
      console.log('检察官登录')
      this.routers = lvshiRoutes
    }
    if (localStorage.getItem('zhinnegkongshenrouters') == 'true') {
      console.log('律师登录')
      this.routers = jianchaguanRoutes
    }
  },
  methods: {
    getMenuLlist() {
      debugger
      const params = {
        userid: getUserId()
      }
      console.log(params)
      this.$api.getUserMenuList(params).then(response => {
        this.routers = response.data
      })
    }
  }
}
</script>
<style>
.el-menu-item,
.el-submenu__title {
  height: 36px !important;
  line-height: 36px !important;
}
.el-menu-item.is-active {
  background-color: #0f51b4 !important;
}
.el-submenu__title i {
  color: #fff;
}
.el-icon-arrow-down:before {
  content: '\e790';
}
.el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotateZ(-90deg);
}
.el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(0deg);
  -ms-transform: rotate(0deg);
  transform: rotateZ(0deg);
}
.el-menu-item i {
  color: inherit;
}
</style>
