import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import Router from 'vue-router';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import Feedback from '@/components/pages/Feedback';
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Statistics from '@/components/pages/Statistics';
import MemoList from '@/components/pages/MemoList';
import MemoSearchResult from '@/components/pages/MemoSearchResult';
import MemoTrash from '@/components/pages/MemoTrash';
import MemoModification from '@/components/pages/MemoModification';
import PhotoModification from '@/components/pages/PhotoModification';
import Profile from '@/components/pages/Profile';
import GlobalHeader from '@/components/organisms/GlobalHeader';
import firebase from 'firebase';
import Mixin from '../util/mixin';
import autofocus from 'vue-autofocus-directive';
import 'lazysizes';

Vue.directive('autofocus', autofocus);
Vue.use(firestorePlugin);
Vue.mixin(Mixin);
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueMaterial);

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: { isPublic: true, title: 'ログイン' }
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup,
			meta: { isPublic: true, title: 'サインアップ' }
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
					meta: { title: 'サインアップ' },
					props: true
				},
				{
					path: 'memo-list',
					name: 'memoList',
					component: MemoList,
					meta: { title: 'メモ一覧' },
					props: true
				},
				{
					path: 'memo-trash',
					name: 'memoTrash',
					meta: { title: 'ゴミ箱' },
					component: MemoTrash,
					props: true
				},
				{
					path: 'profile',
					name: 'profile',
					component: Profile,
					meta: { title: 'プロフィール' },
					props: true
				},
				{
					path: 'feedback',
					name: 'feedback',
					component: Feedback,
					meta: { title: 'フィードバック' },
					props: true
				},
				{
					path: 'statistics',
					name: 'statistics',
					component: Statistics,
					meta: { title: '統計' },
					props: true
				},
				{
					path: 'memo/search/',
					query: { q: 'word' },
					name: 'memoSearch',
					component: MemoSearchResult,
					meta: { title: 'メモ検索結果' },
					props: true
				}
			]
		},
		{
			path: '/memo/modification/:memoId?',
			name: 'memoModification',
			component: MemoModification,
			meta: { title: 'メモを更新' }
		},
		{
			path: '/profile/photo/modification',
			name: 'photoModification',
			component: PhotoModification,
			meta: { title: '写真を編集' }
		},
		// catch all redirect
		{
			path: '*',
			redirect: '/browse/memo-list'
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
