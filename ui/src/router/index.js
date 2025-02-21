import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/views/Layout.vue"
import Login from "@/views/Login.vue"
import dynamicRoute from "./dynamicRoute"
import { useUserStore } from "@/stores/userStore"
import { useLoadRouterStore } from "@/stores/loadRouter"
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

const checkPermission = (item, role) => {
  if (item.meta) {
    return item.meta.requireAdmin && role === "admin"
  }
  return true
}

const addDynamicRoute = () => {
  const isLoadRouterStore = useLoadRouterStore()
  const userStore = useUserStore()
  const role = userStore.userInfo.role
  console.log(role)

  if (!router.hasRoute("layout")) {
    router.addRoute({
      path: "/layout",
      name: "layout",
      component: Layout,
    })
  }

  dynamicRoute.forEach((item) => {
    if (checkPermission(item, role)) router.addRoute("layout", item)
  })
  isLoadRouterStore.setIsLoadRouter(true)
}

router.beforeEach((to, from, next) => {
  const isLoadRouterStore = useLoadRouterStore()

  if (to.name === "login") {
    next()
  } else {
    if (localStorage.getItem("token")) {
      if (!isLoadRouterStore.isLoadRouter) {
        addDynamicRoute()
        next(to.fullPath)
      }
      next()
    } else {
      next("/login")
    }
  }
})

export default router
