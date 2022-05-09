import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light',
    isloading: false,
    requestErr: false,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
    /**显示隐藏loading */
    showLoading(state) {
      state.isloading = true;
    },
    hiddenLoading(state) {
      state.isloading = false;
    },
    /**修改网络状态 */
    setRequestErr(state) {
      state.requestErr = true;
    }
  },
  getters: {
    getTheme(state) {
      if (localStorage.getItem('theme')) {
        state.theme = localStorage.getItem('theme');
      }
      return state.theme;
    },
    /**获取网络请求状态 */
    getRequestType(state) {
      return state.requestErr;
    },
  },
  actions: {
  },
  modules: {
  }
})
