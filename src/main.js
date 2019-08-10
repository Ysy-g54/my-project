// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import firebaseConfig from "@/configs/firebase.js";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "@/assets/vue-material.icons.css";

Vue.config.productionTip = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App },
	store,
	methods: {},
	created() {
		Promise.resolve().then(() => {
			store.dispatch("findLoginUser");
		});
	}
});
