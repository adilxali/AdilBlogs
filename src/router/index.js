import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddPostView from "../views/AddPostView.vue";
import PostsView from "../views/PostsView.vue";
import PostView from "../views/PostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        guest: false,
      },
    },
    {
      path: "/add-post",
      name: "add-post",
      component: AddPostView,
      meta: {
        guest: false,
      },
    },
    {
      path: "/posts",
      name: "posts",
      component: PostsView,
      meta: {
        guest: false,
      },
    },
    {
      path: "/post/:slug",
      name: "post",
      component: PostView,
      meta: {
        guest: false,
      },
    },
    {
      path: "/edit-post/:slug",
      name: "edit-post",
      component: AddPostView,
      meta: {
        guest: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
      meta: {
        guest: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("user");
  if (to.meta.guest && isAuthenticated) {
    next({ name: "home" });
  } else if (!to.meta.guest && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});


export default router;
