// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from 'firebase';

Vue.config.productionTip = false;

// Initialize Firebase
const config = {
	apiKey: "AIzaSyAiD2rUjrmntKbEJjBQafnQVNTh_MLXqjI",
	authDomain: "memo-d707b.firebaseapp.com",
	databaseURL: "https://memo-d707b.firebaseio.com",
	projectId: "memo-d707b",
	storageBucket: "memo-d707b.appspot.com",
	messagingSenderId: "1056391428197"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App }
});
