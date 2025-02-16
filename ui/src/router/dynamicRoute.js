import UserAdd from "@/views/user/UserAdd.vue"
import UserInFo from "@/views/user/UserInFo.vue"
import ProductAdd from "@/views/product/ProductAdd.vue"
import ProductInfo from "@/views/product/ProductInfo.vue"
import Index from "@/views/Index.vue"
import NotFound from "@/views/NotFound.vue"

const dynamicRoute = [
  {
    path: "/index",
    component: Index,
    name: "index",
  },
  {
    path: "/user/user-add",
    name: "user-add",
    component: UserAdd,
  },
  {
    path: "/user/user-info",
    name: "user-info",
    component: UserInFo,
  },
  {
    path: "/prod/prod-add",
    name: "prod-add",
    component: ProductAdd,
  },
  {
    path: "/prod/prod-info",
    name: "prod-info",
    component: ProductInfo,
  },
  {
    path: "/:pathMatch(.*)*",
    name: 404,
    component: NotFound,
  },
]

export default dynamicRoute
