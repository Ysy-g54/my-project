import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import VueMaterial from "vue-material";
import Login from "@/components/pages/Login";
import Goal from "@/components/pages/Goal";
import Memo from "@/components/pages/Memo";
import MemoTrash from "@/components/pages/MemoTrash";
import MemoModification from "@/components/pages/MemoModification";
import GlobalHeader from "@/components/organisms/GlobalHeader";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "@/assets/vue-material.icons.css";

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(VueMaterial);

export default new Router({
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login
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
