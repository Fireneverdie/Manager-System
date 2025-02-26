<script setup>
import { RouterView } from "vue-router"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
import { useUserStore } from "@/stores/userStore"
import { useLoadRouterStore } from "@/stores/loadRouter"
const userStore = useUserStore()
const loadRouterStore = useLoadRouterStore()
const handleLogout = () => {
  localStorage.removeItem("token")
  userStore.clearUserInfo()
  loadRouterStore.setIsLoadRouter(false)
  router.removeRoute("layout")
  router.push("/login")
}

const hadleCenter = () => {
  router.push("/user/center")
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="route.fullPath"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item index="/index">
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/user" v-if="userStore.userInfo.role === 'admin'">
            <template #title>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user/user-add">添加用户</el-menu-item>
            <el-menu-item index="/user/user-info">用户信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/prod">
            <template #title>
              <span>产品管理</span>
            </template>
            <el-menu-item index="/prod/prod-add">添加产品</el-menu-item>
            <el-menu-item index="/prod/prod-info">产品信息</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <el-icon>
              <Menu />
            </el-icon>
            <span style="margin-left: 10px">企业门户网站管理系统</span>
          </div>
          <div class="right">
            <span>欢迎回来 {{ userStore.userInfo.username }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon :size="30">
                  <User />
                </el-icon>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="hadleCenter"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleLogout"
                    >退出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-aside {
  max-width: 150px;
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}

.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right,
.left {
  display: flex;
}

.left {
  i {
    margin: auto;
    cursor: pointer;
  }
}

.right {
  .el-dropdown {
    margin: auto;
  }
}
</style>
