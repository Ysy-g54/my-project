import firebase from "firebase";
import "firebase/firestore";
import Vuex from "vuex";

const store = new Vuex.Store({
  namespaced: true,
  state: {
    loginUser: {
      displayName: "",
      mailAddress: "",
      photoUrl: "",
      uid: "",
      emailVerified: "",
      memoDisplayForm: "",
      userSettingId: ""
    }
  },
  mutations: {
    async setLoginUser(state) {
      await firebase.auth().onAuthStateChanged(async loginUser => {
        await firebase
          .firestore()
          .collection("userSetting")
          .where("uid", "==", loginUser.uid)
          .get()
          .then(async querySnapshot => {
            await querySnapshot.forEach(document => {
              state.loginUser.memoDisplayForm = document.data().memoDisplayForm;
              state.loginUser.userSettingId = document.id;
              localStorage.setItem(
                "value.memoDisplayForm",
                document.data().memoDisplayForm
              );
            });
            state.loginUser.displayName = loginUser.displayName || "";
            state.loginUser.mailAddress = loginUser.email || "";
            state.loginUser.photoUrl = loginUser.photoURL || "";
            state.loginUser.uid = loginUser.uid || "";
            state.loginUser.emailVerified = loginUser.emailVerified || "";
          });
      });
    },
    logout(state) {
      state.loginUser.displayName = "";
      state.loginUser.mailAddress = "";
      state.loginUser.photoUrl = "";
      state.loginUser.uid = "";
      state.loginUser.emailVerified = "";
      state.loginUser.memoDisplayForm = "";
      state.loginUser.userSettingId = "";
    }
  },
  actions: {
    updateLoginUser(context, params) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(params.mailAddress, params.password)
        .then(() => {
          context.commit("setLoginUser");
        });
    },
    async findLoginUser(context) {
      await context.commit("setLoginUser");
    },
    logout(context) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("logout");
        });
    }
  },
  getters: {
    getLoginUser: state => {
      return state.loginUser;
    }
  }
});

export default store;
