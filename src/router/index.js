import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  },
  {
    path: "/auth/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Auth/Login.vue")
  },
  {
    path: "/auth/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Auth/Register.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {

  const page = to.name
  const publicPages = ['Home', 'Login', 'Register'];
  const authRequired = !publicPages.includes(page);
  const loggedIn = store.getters.isLoggedIn
  
  if(loggedIn && (page === 'Login' || page === 'Register')) return next({replace: true, name: from.name})
  
  if (authRequired && !loggedIn) return next({replace: true, name: 'Login'});

  next();
})

export default router;
