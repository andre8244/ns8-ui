import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Tasks from "../views/Tasks.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// go to login page if there is no auth token in local storage
router.beforeEach((to, from, next) => {
  let isAuthenticated = false;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // (token expiration is checked only when invoking server API)
  if (loggedUser && loggedUser.token) {
    isAuthenticated = true;
  }

  if (to.name !== "Login" && !isAuthenticated) {
    console.log("no token in localstorage"); ////

    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
