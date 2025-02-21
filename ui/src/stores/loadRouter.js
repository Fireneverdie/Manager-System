import { ref } from "vue"
import { defineStore } from "pinia"

export const useLoadRouterStore = defineStore("loadRouter", () => {
  const isLoadRouter = ref(false)

  function setIsLoadRouter(value) {
    isLoadRouter.value = value
  }

  return { isLoadRouter, setIsLoadRouter }
})
