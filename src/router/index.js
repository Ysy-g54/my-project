import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/pages/Hello';
import VueMaterial from 'vue-material';

Vue.use(Router);
Vue.use(VueMaterial);

export default new Router({
	routes: [{
		path: '/',
		name: 'Hello',
		component: Hello,
		meta: {
			currentHeader: GlobalHeader
		},
	}]
});
