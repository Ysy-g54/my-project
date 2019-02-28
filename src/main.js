// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase";
import process from "../.env";

Vue.config.productionTip = false;

// Initialize Firebase
const config = {
  apiKey: process.apiKey,
  authDomain: process.authDomain,
  databaseURL: process.databaseURL,
  projectId: "memo-d707b",
  storageBucket: process.storageBucket,
  messagingSenderId: process.messagingSenderId
};
firebase.initializeApp(config);

export default firebase;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
