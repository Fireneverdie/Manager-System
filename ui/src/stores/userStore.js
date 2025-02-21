import { ref } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({})

  function setUserInfo(info) {
    userInfo.value = info
  }

  function clearUserInfo() {
    userInfo.value = null
  }

  return { userInfo, setUserInfo, clearUserInfo }
})
