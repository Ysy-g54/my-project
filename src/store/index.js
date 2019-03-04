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
    setLoginUser(state, loginUser) {
      state.loginUser.mailAddress = loginUser.email;
    }
  },
  actions: {
    updateLoginUser(context, params) {
      firebase
        .auth()
        .signInWithEmailAndPassword(params.mailAddress, params.password)
        .then(() => {
          context.commit("setLoginUser", firebase.auth().currentUser);
          return firebase.auth().currentUser;
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
