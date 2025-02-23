<script setup>
import { useUserStore } from "@/stores/userStore"
const userStore = useUserStore()
</script>
<template>
  <div>
    <el-page-header content="首页" icon="" title="企业门户网站管理系统" />

    <el-card class="card-box">
      <el-row>
        <el-col :span="4">
          <el-avatar
            :size="100"
            :src="userStore.userInfo.avatarUrl"
            v-if="userStore.userInfo.avatarUrl"
          />
          <el-avatar
            :size="100"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            v-else
          />
        </el-col>
        <el-col :span="20" style="line-height: 90px">
          <h3>欢迎 {{ userStore.userInfo.username }} 回来</h3>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="card-box">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card-box {
  margin-top: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
