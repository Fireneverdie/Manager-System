import { ref } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({})

    function setUserInfo(info) {
      userInfo.value = info
    }

    function clearUserInfo() {
      userInfo.value = null
    }

    return { userInfo, setUserInfo, clearUserInfo }
  },
  {
    persist: true, // 启用持久化，默认使用 localStorage
  }
)
