import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = '/login';
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  } else if (!authRequired && loggedIn) {
    return next('/dashboard');
  }

  next();
})

export default router;
