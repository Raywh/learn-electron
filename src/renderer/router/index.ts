import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/h", component: () => import("../components/HelloWorld.vue") },
  { path: "/todo", component: () => import("../components/TodoList.vue") },
  { path: "/", component: () => import("../components/ChatGpt/index.vue") },
];

// 默认导出 router 实例
export default createRouter({
  history: createWebHistory(),
  routes,
});
