<template>
  <div>
    <el-card>
      <el-page-header content="产品编辑" @back="handleBack" title="产品管理" />

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
          <el-button type="primary" @click="submitForm"> 更新产品 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import Upload from "@/components/upload/Upload.vue"
import request from "@/utils/axios-config"
import { ElMessage } from "element-plus"
import { ref, reactive, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()
const productFormRef = ref({})
const productForm = reactive({
  id: null,
  name: "",
  introduction: "",
  cover: "",
  file: null,
})
onMounted(async () => {
  const res = await request.get(`/products/${route.params.id}`)
  Object.assign(productForm, res.data.data)
})

const handleBack = () => {
  router.back()
}
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

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await request.put("/products", productForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(res)
      if (res.data.code === 200) ElMessage.success("更新成功")

      router.back()
    }
  })
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}
</style>
