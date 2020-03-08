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
			publicFlg: false,
			photoReference: "",
			userSettingId: "",
			providerId: ""
		}
	},
	mutations: {
		async setLoginUser(state) {
			await firebase.auth().onAuthStateChanged(loginUser => {
				state.loginUser.displayName = loginUser.displayName || "";
				state.loginUser.mailAddress = loginUser.email || "";
				state.loginUser.photoUrl = loginUser.photoURL || "";
				state.loginUser.uid = loginUser.uid || "";
				state.loginUser.emailVerified = loginUser.emailVerified || "";
				state.loginUser.providerId = loginUser.providerData[0].providerId || "";
				firebase
					.firestore()
					.collection("userSetting")
					.where("userId", "==", state.loginUser.uid)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(document => {
							state.loginUser.memoDisplayForm = document.data().memoDisplayForm;
							state.loginUser.publicFlg = document.data().publicFlg !== undefined
								? document.data().publicFlg : false;
							state.loginUser.photoReference = document.data().photoReference;
							state.loginUser.userSettingId = document.id;
						});
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
			state.loginUser.publicFlg = false;
			state.loginUser.photoReference = "";
			state.loginUser.userSettingId = "";
			state.loginUser.providerId = "";
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
