import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import Hello from '@/components/pages/Hello';
import Hello2 from '@/components/pages/Hello2';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueMaterial);

export default new Router({
	routes: [{
		path: '/',
		name: 'Hello',
		component: Hello
	},
	{
		path: '/test',
		name: 'Hello2',
		component: Hello2
	}]
});
