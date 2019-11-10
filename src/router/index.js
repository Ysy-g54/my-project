import Vue from "vue";
import { firestorePlugin } from "vuefire";
import Router from "vue-router";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import ActionHistory from "@/components/pages/ActionHistory";
import Feedback from "@/components/pages/Feedback";
import ForgotPassword from "@/components/pages/ForgotPassword";
import Login from "@/components/pages/Login";
import Signup from "@/components/pages/Signup";
import Statistics from "@/components/pages/Statistics";
import Memos from "@/components/pages/Memos";
import MemoSearchResult from "@/components/pages/MemoSearchResult";
import MemoTrash from "@/components/pages/MemoTrash";
import MemoModification from "@/components/pages/MemoModification";
import PhotoModification from "@/components/pages/PhotoModification";
import Profile from "@/components/pages/Profile";
import Setting from "@/components/pages/Setting";
import GlobalHeader from "@/components/organisms/GlobalHeader";
import firebase from "firebase";
import Mixin from "../util/mixin";
import autofocus from "vue-autofocus-directive";
import "lazysizes";

Vue.directive("autofocus", autofocus);
Vue.use(firestorePlugin);
Vue.mixin(Mixin);
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueMaterial);

const router = new Router({
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login,
			meta: { isPublic: true, title: "ログイン" }
		},
		{
			path: "/forgot-password",
			name: "ForgotPassword",
			component: ForgotPassword,
			meta: { isPublic: true, title: "パスワードリセット" }
		},
		{
			path: "/signup",
			name: "signup",
			component: Signup,
			meta: { isPublic: true, title: "サインアップ" }
		},
		{
			path: "/browse",
			component: GlobalHeader,
			props: true,
			children: [
				{
					path: "action-history",
					name: "actionHistory",
					component: ActionHistory,
					meta: { title: "行動履歴" },
					props: true
				},
				{
					path: "memo-list",
					name: "memos",
					component: Memos,
					meta: { title: "メモ一覧" },
					props: true
				},
				{
					path: "memo-trash",
					name: "memoTrash",
					meta: { title: "ゴミ箱" },
					component: MemoTrash,
					props: true
				},
				{
					path: "profile",
					name: "profile",
					component: Profile,
					meta: { title: "プロフィール" },
					props: true
				},
				{
					path: "setting",
					name: "setting",
					component: Setting,
					meta: { title: "設定" },
					props: true
				},
				{
					path: "feedback",
					name: "feedback",
					component: Feedback,
					meta: { title: "フィードバック" },
					props: true
				},
				{
					path: "statistics",
					name: "statistics",
					component: Statistics,
					meta: { title: "統計" },
					props: true
				},
				{
					path: "memo/search/",
					query: { q: "word" },
					name: "memoSearch",
					component: MemoSearchResult,
					meta: { title: "メモ検索結果" },
					props: true
				}
			]
		},
		{
			path: "/memo/modification/:memoId?",
			name: "memoModification",
			component: MemoModification,
			meta: { title: "メモを更新" }
		},
		{
			path: "/profile/photo/modification",
			name: "photoModification",
			component: PhotoModification,
			meta: { title: "写真を編集" }
		},
		// catch all redirect
		{
			path: "*",
			redirect: "/browse/memo-list"
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.isPublic)) {
		// 遷移先がルート認証不要な場合は指定している画面へ遷移します。
		next();
	} else {
		// 遷移先がルート認証必要な場合は、ログインしているかどうか確認します。
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				// ログインしている場合は指定している画面へ遷移します。
				next();
			} else {
				// ログインしていない場合はログイン画面へ遷移します。
				next({ name: "login" });
			}
		});
	}
});

export default router;
