import { createApp } from "vue"
import { createPinia } from "pinia"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue"
import router from "./router"
// import "./utils/axios-config"

const app = createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount("#app")
