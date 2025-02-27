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

// router.beforeEach((to, from, next) => {
//   const isLoadRouterStore = useLoadRouterStore()

//   if (to.name === "login") {
//     next()
//   } else {
//     if (localStorage.getItem("token")) {
//       if (!isLoadRouterStore.isLoadRouter) {
//         addDynamicRoute()
//         next(to.fullPath)
//       }
//       next()
//     } else {
//       next("/login")
//     }
//   }
// })
router.beforeEach(async (to, from, next) => {
  const isLoadRouterStore = useLoadRouterStore()

  if (to.name === "login") {
    return next() // 如果是登录页面，直接放行
  }

  if (!localStorage.getItem("token")) {
    return next("/login") // 如果没有token，重定向到登录页
  }

  // 如果路由已经加载过，则直接放行
  if (isLoadRouterStore.isLoadRouter) {
    return next()
  }

  // 动态加载路由
  addDynamicRoute()

  // 确保路由加载完成后再继续导航
  next(to.fullPath)
})

export default router
