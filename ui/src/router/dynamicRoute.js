import UserAdd from "@/views/user/UserAdd.vue"
import UserInFo from "@/views/user/UserInFo.vue"
import ProductAdd from "@/views/product/ProductAdd.vue"
import ProductInfo from "@/views/product/ProductInfo.vue"
import Index from "@/views/Index.vue"
import NotFound from "@/views/NotFound.vue"
import Center from "@/views/user/Center.vue"
import ProductEdit from "@/views/product/ProductEdit.vue"

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
    meta: {
      requireAdmin: true,
    },
  },
  {
    path: "/user/user-info",
    name: "user-info",
    component: UserInFo,
    meta: {
      requireAdmin: true,
    },
  },
  {
    path: "/user/center",
    name: "user-center",
    component: Center,
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
    path: "/prod/prod-edit/:id",
    name: "prod-edit",
    component: ProductEdit,
  },
  {
    path: "/:pathMatch(.*)*",
    name: 404,
    component: NotFound,
  },
]

export default dynamicRoute
