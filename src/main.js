// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Vuex from 'vuex';
import Router from 'vue-router';

Vue.use(Router);
Vue.use(Vuex);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	store: new Vuex.Store(store),
	router: new Router(router),
	template: '<App/>',
	components: { App },
	created() {}
});
