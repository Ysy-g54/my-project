import firebase from "firebase";
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
    updateLoginUser(context, params) {
      firebase
        .auth()
        .signInWithEmailAndPassword(params.mailAddress, params.password)
        .then(data => {
          context.commit("updateLoginUser", data);
          return data;
        });
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
