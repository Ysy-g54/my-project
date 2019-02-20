import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import VueMaterial from "vue-material";
import Login from "@/components/pages/Login";
import Memo from "@/components/pages/Memo";
import MemoModification from "@/components/pages/MemoModification";
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
      name: "Login",
      component: Login
    },
    {
      path: "/memo",
      name: "Memo",
      component: Memo
    },
    {
      path: "/memo/modification/:memoId?",
      name: "MemoModification",
      component: MemoModification
    },
    // catch all redirect
    {
      path: "*",
      redirect: "/login"
    }
  ]
});
