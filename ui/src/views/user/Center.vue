<template>
  <div>
    <el-page-header content="个人中心" icon="" title="企业门户网站管理系统" />

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="card-box">
          <el-avatar :size="100" :src="showAvatarUrl" />
          <h3>{{ userStore.userInfo.username }}</h3>
          <h5>{{ userStore.userInfo.role === "admin" ? "ADMIN" : "EDIT" }}</h5>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="card-box">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            style="max-width: 600px"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <Upload
                :avatar="userForm.avatar"
                @fileChange="handleAvatarChange"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">
                UPDATE
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore"
import { computed } from "vue"
import request from "@/utils/axios-config"
const userStore = useUserStore()
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import Upload from "@/components/upload/Upload.vue"

const { username, id, avatar } = userStore.userInfo
const userFormRef = ref({})
const userForm = reactive({
  id,
  username,
  password: "",
  avatar,
  file: null,
})

const showAvatarUrl = computed(() => {
  if (userForm.avatar.startsWith("/"))
    return "http://localhost:3000" + userForm.avatar
  return userForm.avatar
})

const handleAvatarChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}

const userFormRules = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],

  avatar: [{ required: true, message: "Please input avatar", trigger: "blur" }],
})

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await request.put("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data.code === 200) {
        const userInfo = await request.get(`/users/${userStore.userInfo.id}`)
        userStore.setUserInfo(userInfo.data.data)
        Object.assign(userForm, userInfo.data.data)
        userForm.password = ""
        ElMessage.success("更新成功")
      }
    }
  })
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;

  .card-box {
    text-align: center;
  }
}
</style>
