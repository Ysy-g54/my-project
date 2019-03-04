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
    setLoginUser(state) {
      let loginUser = firebase.auth().currentUser;
      state.loginUser.mailAddress = loginUser.email;
    }
  },
  actions: {
    updateLoginUser(context, params) {
      firebase
        .auth()
        .signInWithEmailAndPassword(params.mailAddress, params.password)
        .then(() => {
          context.commit("setLoginUser");
          return firebase.auth().currentUser;
        });
    },
    findLoginUser(context) {
      context.commit("setLoginUser");
      return firebase.auth().currentUser;
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
