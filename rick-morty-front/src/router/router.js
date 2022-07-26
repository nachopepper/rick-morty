import Vue from "vue";
import VueRouter from "vue-router";
import CharacterPage from "../pages/CharacterPage";
import FavoritePage from "../pages/FavoritePage";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { name: "Home", path: "/", redirect: "/home" },
    { path: "/home", component: CharacterPage, meta: { requiresAuth: false } },
    {
      name: "Favorite",
      path: "/favorite",
      component: FavoritePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      redirect: "/home",
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  // await store.dispatch("checkUserInfo");
  if (to.meta.requiresAuth && !store.getters.getUserInfo) {
    next("/home");
  } else {
    next();
  }
});

export default router;
