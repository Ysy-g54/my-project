import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import VueMaterial from "vue-material";
import Goal from "@/components/pages/Goal";
import GoalModification from "@/components/pages/GoalModification";
import "vue-material/dist/vue-material.min.css";
import "@/assets/vue-material.icons.css";

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(VueMaterial);

export default new Router({
  routes: [
    {
      path: "/goal",
      name: "Goal",
      component: Goal
    },
    {
      path: "/goal/modification",
      name: "GoalModification",
      component: GoalModification
    },
    // catch all redirect
    {
      path: "*",
      redirect: "/goal"
    }
  ]
});
