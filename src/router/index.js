import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import Router from 'vue-router';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import Feedback from '@/components/pages/Feedback';
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Statistics from '@/components/pages/Statistics';
import MemoHistory from '@/components/pages/MemoHistory';
import MemoTrash from '@/components/pages/MemoTrash';
import MemoModification from '@/components/pages/MemoModification';
import Setting from '@/components/pages/Setting';
import GlobalHeader from '@/components/organisms/GlobalHeader';
import firebase from 'firebase';

Vue.use(firestorePlugin);
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueMaterial);

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: { isPublic: true }
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup,
			meta: { isPublic: true }
		},
		{
			path: '/browse',
			component: GlobalHeader,
			props: true,
			children: [
				{
					path: 'Feedback',
					name: 'Feedback',
					component: Feedback,
					props: true
				},
				{
					path: 'memo-history',
					name: 'memoHistory',
					component: MemoHistory,
					props: true
				},
				{
					path: 'memo-trash',
					name: 'memoTrash',
					component: MemoTrash,
					props: true
				},
				{
					path: 'setting',
					name: 'setting',
					component: Setting,
					props: true
				},
				{
					path: 'statistics',
					name: 'statistics',
					component: Statistics,
					props: true
				}
			]
		},
		{
			path: '/memo/modification/:memoId?',
			name: 'memoModification',
			component: MemoModification
		},
		// catch all redirect
		{
			path: '*',
			redirect: '/login'
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.isPublic)) {
		// 遷移先がルート認証不要な場合は指定している画面へ遷移します。
		next();
	} else {
		// 遷移先がルート認証必要な場合は、サインインしているかどうか確認します。
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				// サインインしている場合は指定している画面へ遷移します。
				next();
			} else {
				// サインインしていない場合はログイン画面へ遷移します。
				next({ name: 'login' });
			}
		});
	}
});

export default router;
