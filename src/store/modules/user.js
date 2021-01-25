import { login, getUserMenuList } from '@/api/user'
import { getToken, setToken, removeToken, setUserId } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [{
    name: 'admin'
  }],
  userInfo: '',
  menuList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENULIST: (state, menuList) => {
    state.menuList = menuList
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { dlbm, password, dwbm } = userInfo
    return new Promise((resolve, reject) => {
      login({ dlbm: dlbm.trim(), password: password, dwbm: dwbm }).then(response => {
        const { data } = response
        debugger
        console.log(data)
        commit('SET_TOKEN', data.token)
        commit('SET_USERINFO', data.user)
        setToken(data.token)
        setUserId(data.user.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user menu
  getMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      const params = {
        userid: state.userInfo && state.userInfo.id
      }
      getUserMenuList(params).then(response => {
        debugger
        const { data } = response
        commit('SET_MENULIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
