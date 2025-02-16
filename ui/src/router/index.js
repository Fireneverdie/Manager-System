import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/views/Layout.vue"
import Login from "@/views/Login.vue"
import dynamicRoute from "./dynamicRoute"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/layout",
      name: "layout",
      component: Layout,
    },
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
})

const addDynamicRoute = () => {
  dynamicRoute.forEach((item) => {
    router.addRoute("layout", item)
  })
}
addDynamicRoute()

export default router
