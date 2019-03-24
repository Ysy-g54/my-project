import firebase from "firebase";
import Vuex from "vuex";

const store = new Vuex.Store({
	namespaced: true,
	state: {
		loginUser: {
			name: "",
			mailAddress: "",
			photoUrl: "",
			uid: "",
			emailVerified: ""
		},
		loading: false
	},
	mutations: {
		setLoginUser(state) {
			firebase.auth().onAuthStateChanged(loginUser => {
				if (loginUser !== null) {
					state.loginUser.name = loginUser.displayName;
					state.loginUser.mailAddress = loginUser.email;
					state.loginUser.photoUrl = loginUser.photoUrl;
					state.loginUser.uid = loginUser.uid;
					state.loginUser.emailVerified = loginUser.emailVerified;
				}
			});
		},
		logout(state) {
			// let deleteReq = indexedDB.deleteDatabase("firebaseLocalStorage");

			// deleteReq.onsuccess = () => {
			// 	console.log('db delete success');
			// };
			state.loginUser.name = "";
			state.loginUser.mailAddress = "";
			state.loginUser.photoUrl = "";
			state.loginUser.uid = "";
			state.loginUser.emailVerified = "";
		},
		setIsLoading(state, flg) {
			state.loading = flg;
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
		findLoginUser(context) {
			context.commit("setLoginUser");
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
		getLoginUser: (state) => {
			return state.loginUser;
		}
	}
});

export default store;
