import firebase from "firebase";
import Vuex from "vuex";

const Login = {
  namespaced: true,
  state: {
    loginUser: {
      name: "",
      mailAddress: "",
      photoUrl: "",
      uid: "",
      emailVerified: ""
    }
  },
  mutations: {
    setLoginUser(state) {
      let loginUser = firebase.auth().currentUser;
      if (loginUser != null) {
        state.loginUser.name = loginUser.displayName;
        state.loginUser.mailAddress = loginUser.email;
        state.loginUser.photoUrl = loginUser.photoUrl;
        state.loginUser.uid = loginUser.uid;
        state.loginUser.emailVerified = loginUser.emailVerified;
      }
    }
  },
  actions: {
    updateLoginUser(context, params) {
      return firebase
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
