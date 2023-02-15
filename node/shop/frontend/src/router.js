import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "shop",
    component: () => import("./views/Index.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("./views/Index.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("./views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("./views/Orders.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
