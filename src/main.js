// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import firebase from 'firebase';
import firebaseConfig from '@/configs/firebase.js';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '@/assets/vue-material.icons.css';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
	store,
	methods: {},
	created() {
		Promise.resolve().then(() => {
			store.dispatch('findLoginUser');
			if (this.$router.history.current.name === 'login') {
				this.$router.push({ name: 'memos' });
			}
		});
	}
});
