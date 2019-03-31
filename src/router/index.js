import Vue from "vue";
// import { firestorePlugin, vuefire } from "vuefire";
import Router from "vue-router";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import Login from "@/components/pages/Login";
import Signup from "@/components/pages/Signup";
import Goal from "@/components/pages/Goal";
import Memo from "@/components/pages/Memo";
import MemoTrash from "@/components/pages/MemoTrash";
import MemoModification from "@/components/pages/MemoModification";
import GlobalHeader from "@/components/organisms/GlobalHeader";
import 'firebase/firestore';

// Vue.use(firestorePlugin);
// Vue.use(vuefire);
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueMaterial);

const router = new Router({
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login,
			meta: { isPublic: true }
		},
		{
			path: "/signup",
			name: "signup",
			component: Signup,
			meta: { isPublic: true }
		},
		{
			path: "/browse",
			component: GlobalHeader,
			props: true,
			children: [
				{
					path: "memo",
					name: "memo",
					component: Memo,
					props: true
				},
				{
					path: "memotrash",
					name: "memoTrash",
					component: MemoTrash,
					props: true
				}
			]
		},
		{
			path: "/memo/modification/:memoId?",
			name: "memoModification",
			component: MemoModification
		},
		{
			path: "/browse",
			component: GlobalHeader,
			props: true,
			children: [
				{
					path: "goal",
					name: "goal",
					component: Goal,
					props: true
				}
			]
		},
		// catch all redirect
		{
			path: "*",
			redirect: "/login"
		}
	]
});

export default router;
