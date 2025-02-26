<script setup>
import Upload from "@/components/upload/Upload.vue"
import { ElMessage } from "element-plus"
import { ref, reactive } from "vue"
import request from "@/utils/axios-config"
const userFormRef = ref({})
const userForm = reactive({
  username: "",
  password: "",
  role: "editor", //1是管理员 2是编辑
  avatar: "",
  file: null,
})

const handleAvatarChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}

const userFormRules = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],

  role: [
    { required: true, message: "Please select your role", trigger: "blur" },
  ],
  avatar: [
    { required: true, message: "Please choose your avatar", trigger: "blur" },
  ],
})

const options = [
  {
    value: "admin",
    label: "管理员",
  },
  {
    value: "editor",
    label: "编辑",
  },
]
import { useRouter } from "vue-router"
const router = useRouter()
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await request.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data.code === 200) ElMessage.success("添加成功")

      router.push("/user/user-info")
    }
  })
}
</script>
<template>
  <div>
    <el-page-header content="用户管理" icon="" title="添加用户" />

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
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select
          v-model="userForm.role"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @fileChange="handleAvatarChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 添加用户 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}
</style>
