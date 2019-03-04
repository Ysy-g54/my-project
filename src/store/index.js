import Vuex from "vuex";

const Login = {
  namespaced: true,
  state: {
    loginUser: {
      mailAddress: null
    }
  },
  mutations: {
    updateLoginUser(state, loginUser) {
      state.loginUser = loginUser;
    }
  },
  actions: {
    updateLoginUser(context, loginUser) {
      context.commit("updateLoginUser", loginUser);
    }
  },
  getters: {
    getLoginUser(state) {
      return state.loginUser;
    }
  }
};

export default new Vuex.Store({
  modules: {
    Login
  }
});
