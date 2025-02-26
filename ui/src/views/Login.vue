<script setup>
import { ref } from "vue"
import axios from "axios"
import { useUserStore } from "@/stores/userStore"
import { useRouter } from "vue-router"
import request from "../utils/axios-config"
const router = useRouter()
const userStore = useUserStore()
const loginForm = ref({
  username: "",
  password: "",
  role: "admin",
})
const login = async () => {
  const res = await request.post("/login", loginForm.value)

  if (res.data.code === 200) {
    userStore.setUserInfo(res.data.data)
  }
  router.push("/index")
}
</script>
<template>
  <section>
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <div class="square" style="--i: 0"></div>
      <div class="square" style="--i: 1"></div>
      <div class="square" style="--i: 2"></div>
      <div class="square" style="--i: 3"></div>
      <div class="square" style="--i: 4"></div>
      <div class="container">
        <div class="form" @submit.prevent="login">
          <h2>Login Form</h2>
          <form>
            <div class="inputBox">
              <input
                type="text"
                placeholder="Username"
                v-model="loginForm.username"
              />
            </div>
            <div class="inputBox">
              <input
                type="password"
                placeholder="Password"
                v-model="loginForm.password"
              />
            </div>
            <div class="inputBox">
              <input type="submit" value="Login" />
            </div>
            <p class="forget">Forgot Password ? <a href="#">Click Here</a></p>
            <p class="forget">
              Don't have an account ? <a href="#">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/css/style.css";
</style>
