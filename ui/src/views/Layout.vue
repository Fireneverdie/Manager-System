<script setup>
import { RouterView } from "vue-router"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
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
          <el-sub-menu index="/user">
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
        <el-header>Header</el-header>
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
</style>
