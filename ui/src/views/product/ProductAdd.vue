<template>
  <div>
    <el-card>
      <el-page-header content="添加产品" icon="" title="产品管理" />

      <el-form
        ref="productFormRef"
        style="max-width: 600px"
        :model="productForm"
        :rules="productFormRules"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="productForm.name" />
        </el-form-item>
        <el-form-item label="产品简要描述" prop="introduction">
          <el-input v-model="productForm.introduction" type="text" />
        </el-form-item>

        <el-form-item label="产品图片" prop="cover">
          <Upload :avatar="productForm.cover" @fileChange="handleCoverChange" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"> 添加产品 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import Upload from "@/components/upload/Upload.vue"
import request from "@/utils/axios-config"
import { ElMessage } from "element-plus"
import { ref, reactive } from "vue"

const productFormRef = ref({})
const productForm = reactive({
  name: "",
  introduction: "",
  cover: "",
  file: null,
})

const handleCoverChange = (file) => {
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}

const productFormRules = reactive({
  name: [
    { required: true, message: "Please input product name", trigger: "blur" },
  ],
  introduction: [
    { required: true, message: "Please input introduction", trigger: "blur" },
  ],
  cover: [
    {
      required: true,
      message: "Please choose your cover img",
      trigger: "blur",
    },
  ],
})

import { useRouter } from "vue-router"
const router = useRouter()
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await request.post("/products", productForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data.code === 200) ElMessage.success("添加成功")

      router.push("/prod/prod-info")
    }
  })
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}
</style>
